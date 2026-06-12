#!/usr/bin/env python3
"""
Create a simple GLB model for Folder2Text logo
Badge (cube) + Logo plane with texture
"""

import struct
import json
import base64
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import io

# Create logo texture
def create_logo_texture():
    """Load and prepare the original Folder2Text icon"""
    icon_path = Path("folder2text_icon.png")

    if not icon_path.exists():
        raise FileNotFoundError(f"Icon not found: {icon_path}")

    # Load original icon
    img = Image.open(icon_path).convert('RGBA')

    # Resize to 512x512 if needed (maintain aspect ratio with padding)
    target_size = 512
    img.thumbnail((target_size, target_size), Image.Resampling.LANCZOS)

    # Create final canvas with transparent background
    final_img = Image.new('RGBA', (target_size, target_size), (0, 0, 0, 0))

    # Center the icon
    x_offset = (target_size - img.width) // 2
    y_offset = (target_size - img.height) // 2
    final_img.paste(img, (x_offset, y_offset), img)

    # Save to bytes
    buffer = io.BytesIO()
    final_img.save(buffer, format='PNG')
    buffer.seek(0)
    return buffer.read()


def create_glb():
    """Create GLB with badge cube and logo plane"""

    # Vertices for cube (badge)
    cube_size = 1.45
    h = cube_size
    d = 0.11  # half depth

    cube_vertices = [
        # Front face
        [-h, -h,  d], [ h, -h,  d], [ h,  h,  d], [-h,  h,  d],
        # Back face
        [-h, -h, -d], [-h,  h, -d], [ h,  h, -d], [ h, -h, -d],
        # Top face
        [-h,  h, -d], [-h,  h,  d], [ h,  h,  d], [ h,  h, -d],
        # Bottom face
        [-h, -h, -d], [ h, -h, -d], [ h, -h,  d], [-h, -h,  d],
        # Right face
        [ h, -h, -d], [ h, -h,  d], [ h,  h,  d], [ h,  h, -d],
        # Left face
        [-h, -h, -d], [-h,  h, -d], [-h,  h,  d], [-h, -h,  d],
    ]

    # Indices for cube
    cube_indices = [
        0,1,2, 0,2,3,    # front
        4,5,6, 4,6,7,    # back
        8,9,10, 8,10,11, # top
        12,13,14, 12,14,15, # bottom
        16,17,18, 16,18,19, # right
        20,21,22, 20,22,23  # left
    ]

    # Normals for cube
    cube_normals = []
    for _ in range(4):
        cube_normals.extend([[0, 0, 1]] * 4)   # front
    for _ in range(4):
        cube_normals.extend([[0, 0, -1]] * 4)  # back
    for _ in range(4):
        cube_normals.extend([[0, 1, 0]] * 4)   # top
    for _ in range(4):
        cube_normals.extend([[0, -1, 0]] * 4)  # bottom
    for _ in range(4):
        cube_normals.extend([[1, 0, 0]] * 4)   # right
    for _ in range(4):
        cube_normals.extend([[-1, 0, 0]] * 4)  # left

    cube_normals = cube_normals[:24]

    # Plane vertices (logo)
    plane_size = 1.45
    plane_z = d + 0.01

    plane_vertices = [
        [-plane_size, -plane_size, plane_z],
        [ plane_size, -plane_size, plane_z],
        [ plane_size,  plane_size, plane_z],
        [-plane_size,  plane_size, plane_z],
    ]

    plane_indices = [0, 1, 2, 0, 2, 3]

    plane_normals = [[0, 0, 1]] * 4

    plane_uvs = [
        [0, 1], [1, 1], [1, 0], [0, 0]
    ]

    # Create binary buffers
    cube_vertex_data = b''.join(struct.pack('<3f', *v) for v in cube_vertices)
    cube_normal_data = b''.join(struct.pack('<3f', *n) for n in cube_normals)
    cube_index_data = b''.join(struct.pack('<H', i) for i in cube_indices)

    plane_vertex_data = b''.join(struct.pack('<3f', *v) for v in plane_vertices)
    plane_normal_data = b''.join(struct.pack('<3f', *n) for n in plane_normals)
    plane_uv_data = b''.join(struct.pack('<2f', *uv) for uv in plane_uvs)
    plane_index_data = b''.join(struct.pack('<H', i) for i in plane_indices)

    # Texture
    texture_data = create_logo_texture()

    # Combine all binary data
    buffer_data = (
        cube_vertex_data + cube_normal_data + cube_index_data +
        plane_vertex_data + plane_normal_data + plane_uv_data +
        plane_index_data + texture_data
    )

    # Offsets
    offset = 0
    cube_vertex_offset = offset
    offset += len(cube_vertex_data)

    cube_normal_offset = offset
    offset += len(cube_normal_data)

    cube_index_offset = offset
    offset += len(cube_index_data)

    plane_vertex_offset = offset
    offset += len(plane_vertex_data)

    plane_normal_offset = offset
    offset += len(plane_normal_data)

    plane_uv_offset = offset
    offset += len(plane_uv_data)

    plane_index_offset = offset
    offset += len(plane_index_data)

    texture_offset = offset

    # Build GLTF JSON
    gltf = {
        "asset": {"version": "2.0", "generator": "Python GLB Generator"},
        "scene": 0,
        "scenes": [{"nodes": [0, 1]}],
        "nodes": [
            {"mesh": 0, "name": "Badge"},
            {"mesh": 1, "name": "Logo"}
        ],
        "meshes": [
            {
                "name": "Badge",
                "primitives": [{
                    "attributes": {
                        "POSITION": 0,
                        "NORMAL": 1
                    },
                    "indices": 2,
                    "material": 0
                }]
            },
            {
                "name": "Logo",
                "primitives": [{
                    "attributes": {
                        "POSITION": 3,
                        "NORMAL": 4,
                        "TEXCOORD_0": 5
                    },
                    "indices": 6,
                    "material": 1
                }]
            }
        ],
        "materials": [
            {
                "name": "BadgeMaterial",
                "pbrMetallicRoughness": {
                    "baseColorFactor": [0.02, 0.05, 0.12, 1.0],
                    "metallicFactor": 0.45,
                    "roughnessFactor": 0.14
                }
            },
            {
                "name": "LogoMaterial",
                "pbrMetallicRoughness": {
                    "baseColorTexture": {"index": 0},
                    "metallicFactor": 0,
                    "roughnessFactor": 1
                },
                "emissiveFactor": [0.4, 0.49, 0.92],
                "alphaMode": "BLEND"
            }
        ],
        "textures": [{"source": 0}],
        "images": [{
            "mimeType": "image/png",
            "bufferView": 7
        }],
        "accessors": [
            # 0: Cube vertices
            {
                "bufferView": 0,
                "componentType": 5126,
                "count": len(cube_vertices),
                "type": "VEC3",
                "max": [h, h, d],
                "min": [-h, -h, -d]
            },
            # 1: Cube normals
            {
                "bufferView": 1,
                "componentType": 5126,
                "count": len(cube_normals),
                "type": "VEC3"
            },
            # 2: Cube indices
            {
                "bufferView": 2,
                "componentType": 5123,
                "count": len(cube_indices),
                "type": "SCALAR"
            },
            # 3: Plane vertices
            {
                "bufferView": 3,
                "componentType": 5126,
                "count": 4,
                "type": "VEC3",
                "max": [plane_size, plane_size, plane_z],
                "min": [-plane_size, -plane_size, plane_z]
            },
            # 4: Plane normals
            {
                "bufferView": 4,
                "componentType": 5126,
                "count": 4,
                "type": "VEC3"
            },
            # 5: Plane UVs
            {
                "bufferView": 5,
                "componentType": 5126,
                "count": 4,
                "type": "VEC2"
            },
            # 6: Plane indices
            {
                "bufferView": 6,
                "componentType": 5123,
                "count": len(plane_indices),
                "type": "SCALAR"
            }
        ],
        "bufferViews": [
            # 0: Cube vertices
            {"buffer": 0, "byteOffset": cube_vertex_offset, "byteLength": len(cube_vertex_data), "target": 34962},
            # 1: Cube normals
            {"buffer": 0, "byteOffset": cube_normal_offset, "byteLength": len(cube_normal_data), "target": 34962},
            # 2: Cube indices
            {"buffer": 0, "byteOffset": cube_index_offset, "byteLength": len(cube_index_data), "target": 34963},
            # 3: Plane vertices
            {"buffer": 0, "byteOffset": plane_vertex_offset, "byteLength": len(plane_vertex_data), "target": 34962},
            # 4: Plane normals
            {"buffer": 0, "byteOffset": plane_normal_offset, "byteLength": len(plane_normal_data), "target": 34962},
            # 5: Plane UVs
            {"buffer": 0, "byteOffset": plane_uv_offset, "byteLength": len(plane_uv_data), "target": 34962},
            # 6: Plane indices
            {"buffer": 0, "byteOffset": plane_index_offset, "byteLength": len(plane_index_data), "target": 34963},
            # 7: Texture image
            {"buffer": 0, "byteOffset": texture_offset, "byteLength": len(texture_data)}
        ],
        "buffers": [{"byteLength": len(buffer_data)}]
    }

    # Create GLB
    json_data = json.dumps(gltf, separators=(',', ':')).encode('utf-8')
    json_padding = (4 - len(json_data) % 4) % 4
    json_data += b' ' * json_padding

    bin_padding = (4 - len(buffer_data) % 4) % 4
    buffer_data += b'\x00' * bin_padding

    # GLB header
    header = struct.pack('<III', 0x46546C67, 2,
                        12 + 8 + len(json_data) + 8 + len(buffer_data))

    # JSON chunk
    json_chunk = struct.pack('<II', len(json_data), 0x4E4F534A) + json_data

    # BIN chunk
    bin_chunk = struct.pack('<II', len(buffer_data), 0x004E4942) + buffer_data

    return header + json_chunk + bin_chunk


if __name__ == "__main__":
    glb_data = create_glb()

    output_path = Path("public/folder2text_logo.glb")
    output_path.parent.mkdir(exist_ok=True)

    with open(output_path, 'wb') as f:
        f.write(glb_data)

    print(f"GLB created: {output_path} ({len(glb_data)} bytes)")
