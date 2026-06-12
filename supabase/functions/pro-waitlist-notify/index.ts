import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================
// Multi-language email templates
// ============================================

interface EmailTemplate {
  subject: string;
  body: string;
}

const userTemplates: Record<string, (plan: string) => EmailTemplate> = {
  it: (plan) => ({
    subject: "Sei nella lista d'attesa Pro! 🎉",
    body: `Ciao!\n\nGrazie per esserti iscritto alla lista d'attesa per il piano ${plan} di CVMaker Pro.\n\nTi invieremo una notifica non appena il piano sarà disponibile.\n\nA presto!\nIl team CVMaker`,
  }),
  en: (plan) => ({
    subject: "You're on the Pro waitlist! 🎉",
    body: `Hi!\n\nThank you for joining the waitlist for the CVMaker Pro ${plan} plan.\n\nWe'll notify you as soon as the plan is available.\n\nSee you soon!\nThe CVMaker Team`,
  }),
  de: (plan) => ({
    subject: "Du bist auf der Pro-Warteliste! 🎉",
    body: `Hallo!\n\nVielen Dank, dass du dich für die Warteliste des CVMaker Pro ${plan}-Plans angemeldet hast.\n\nWir benachrichtigen dich, sobald der Plan verfügbar ist.\n\nBis bald!\nDas CVMaker Team`,
  }),
  fr: (plan) => ({
    subject: "Vous êtes sur la liste d'attente Pro ! 🎉",
    body: `Bonjour !\n\nMerci de vous être inscrit à la liste d'attente pour le plan CVMaker Pro ${plan}.\n\nNous vous avertirons dès que le plan sera disponible.\n\nÀ bientôt !\nL'équipe CVMaker`,
  }),
  es: (plan) => ({
    subject: "¡Estás en la lista de espera Pro! 🎉",
    body: `¡Hola!\n\nGracias por unirte a la lista de espera del plan CVMaker Pro ${plan}.\n\nTe notificaremos tan pronto como el plan esté disponible.\n\n¡Hasta pronto!\nEl equipo CVMaker`,
  }),
  pt: (plan) => ({
    subject: "Você está na lista de espera Pro! 🎉",
    body: `Olá!\n\nObrigado por se inscrever na lista de espera do plano CVMaker Pro ${plan}.\n\nNós notificaremos você assim que o plano estiver disponível.\n\nAté breve!\nA equipe CVMaker`,
  }),
  nl: (plan) => ({
    subject: "Je staat op de Pro-wachtlijst! 🎉",
    body: `Hallo!\n\nBedankt voor je aanmelding voor de wachtlijst van het CVMaker Pro ${plan}-plan.\n\nWe laten je weten zodra het plan beschikbaar is.\n\nTot snel!\nHet CVMaker Team`,
  }),
  pl: (plan) => ({
    subject: "Jesteś na liście oczekujących Pro! 🎉",
    body: `Cześć!\n\nDziękujemy za dołączenie do listy oczekujących na plan CVMaker Pro ${plan}.\n\nPowiadomimy Cię, gdy plan będzie dostępny.\n\nDo zobaczenia!\nZespół CVMaker`,
  }),
  sv: (plan) => ({
    subject: "Du är på Pro-väntelistan! 🎉",
    body: `Hej!\n\nTack för att du gick med i väntelistan för CVMaker Pro ${plan}-planen.\n\nVi meddelar dig så snart planen är tillgänglig.\n\nVi ses!\nCVMaker-teamet`,
  }),
  da: (plan) => ({
    subject: "Du er på Pro-ventelisten! 🎉",
    body: `Hej!\n\nTak fordi du tilmeldte dig ventelisten til CVMaker Pro ${plan}-planen.\n\nVi giver dig besked, så snart planen er tilgængelig.\n\nVi ses!\nCVMaker-teamet`,
  }),
  no: (plan) => ({
    subject: "Du er på Pro-ventelisten! 🎉",
    body: `Hei!\n\nTakk for at du meldte deg på ventelisten for CVMaker Pro ${plan}-planen.\n\nVi gir deg beskjed så snart planen er tilgjengelig.\n\nVi sees!\nCVMaker-teamet`,
  }),
  fi: (plan) => ({
    subject: "Olet Pro-jonotuslistalla! 🎉",
    body: `Hei!\n\nKiitos liittymisestäsi CVMaker Pro ${plan} -suunnitelman jonotuslistalle.\n\nIlmoitamme sinulle heti, kun suunnitelma on saatavilla.\n\nNähdään pian!\nCVMaker-tiimi`,
  }),
  cs: (plan) => ({
    subject: "Jste na čekací listině Pro! 🎉",
    body: `Ahoj!\n\nDěkujeme za přihlášení na čekací listinu plánu CVMaker Pro ${plan}.\n\nUpozorníme vás, jakmile bude plán dostupný.\n\nBrzy na viděnou!\nTým CVMaker`,
  }),
  el: (plan) => ({
    subject: "Είστε στη λίστα αναμονής Pro! 🎉",
    body: `Γεια!\n\nΣας ευχαριστούμε που εγγραφήκατε στη λίστα αναμονής για το πλάνο CVMaker Pro ${plan}.\n\nΘα σας ειδοποιήσουμε μόλις το πλάνο είναι διαθέσιμο.\n\nΤα λέμε σύντομα!\nΗ ομάδα CVMaker`,
  }),
  ro: (plan) => ({
    subject: "Ești pe lista de așteptare Pro! 🎉",
    body: `Bună!\n\nMulțumim că te-ai înscris pe lista de așteptare pentru planul CVMaker Pro ${plan}.\n\nTe vom notifica de îndată ce planul va fi disponibil.\n\nPe curând!\nEchipa CVMaker`,
  }),
  hu: (plan) => ({
    subject: "Felkerültél a Pro várólistára! 🎉",
    body: `Szia!\n\nKöszönjük, hogy feliratkoztál a CVMaker Pro ${plan} terv várólistájára.\n\nÉrtesítünk, amint a terv elérhető lesz.\n\nHamarosan találkozunk!\nA CVMaker csapat`,
  }),
  bg: (plan) => ({
    subject: "Вие сте в списъка на чакащите за Pro! 🎉",
    body: `Здравейте!\n\nБлагодарим ви, че се записахте в списъка на чакащите за плана CVMaker Pro ${plan}.\n\nЩе ви уведомим веднага щом планът стане наличен.\n\nДо скоро!\nЕкипът на CVMaker`,
  }),
  hr: (plan) => ({
    subject: "Na listi čekanja za Pro! 🎉",
    body: `Bok!\n\nHvala što ste se prijavili na listu čekanja za CVMaker Pro ${plan} plan.\n\nObavijestit ćemo vas čim plan bude dostupan.\n\nVidimo se uskoro!\nCVMaker tim`,
  }),
  sk: (plan) => ({
    subject: "Ste na čakacom zozname Pro! 🎉",
    body: `Ahoj!\n\nĎakujeme za prihlásenie na čakací zoznam plánu CVMaker Pro ${plan}.\n\nUpozorníme vás, keď bude plán dostupný.\n\nDovidenia!\nTím CVMaker`,
  }),
  sr: (plan) => ({
    subject: "На листи чекања за Pro! 🎉",
    body: `Здраво!\n\nХвала што сте се пријавили на листу чекања за CVMaker Pro ${plan} план.\n\nОбавестићемо вас чим план буде доступан.\n\nВидимо се ускоро!\nCVMaker тим`,
  }),
  lt: (plan) => ({
    subject: "Esate Pro laukimo sąraše! 🎉",
    body: `Sveiki!\n\nDėkojame, kad užsiregistravote CVMaker Pro ${plan} plano laukimo sąraše.\n\nPranešime jums, kai planas bus prieinamas.\n\nIki pasimatymo!\nCVMaker komanda`,
  }),
  lv: (plan) => ({
    subject: "Jūs esat Pro gaidīšanas sarakstā! 🎉",
    body: `Sveiki!\n\nPaldies, ka pievienojāties CVMaker Pro ${plan} plāna gaidīšanas sarakstam.\n\nMēs jūs informēsim, tiklīdz plāns būs pieejams.\n\nUz drīzu tikšanos!\nCVMaker komanda`,
  }),
  et: (plan) => ({
    subject: "Olete Pro ootenimekirjas! 🎉",
    body: `Tere!\n\nTäname, et liitusite CVMaker Pro ${plan} plaani ootenimekirjaga.\n\nTeavitame teid kohe, kui plaan on saadaval.\n\nKohtumiseni!\nCVMaker meeskond`,
  }),
  sl: (plan) => ({
    subject: "Na čakalni listi za Pro! 🎉",
    body: `Pozdravljeni!\n\nHvala, da ste se prijavili na čakalno listo za načrt CVMaker Pro ${plan}.\n\nObvestili vas bomo, ko bo načrt na voljo.\n\nSe vidimo!\nEkipa CVMaker`,
  }),
  uk: (plan) => ({
    subject: "Ви у списку очікування Pro! 🎉",
    body: `Привіт!\n\nДякуємо за реєстрацію у списку очікування плану CVMaker Pro ${plan}.\n\nМи повідомимо вас, як тільки план стане доступним.\n\nДо зустрічі!\nКоманда CVMaker`,
  }),
  zh: (plan) => ({
    subject: "您已加入Pro等候名单！🎉",
    body: `您好！\n\n感谢您加入CVMaker Pro ${plan}计划的等候名单。\n\n计划推出后我们会立即通知您。\n\n再见！\nCVMaker团队`,
  }),
  ja: (plan) => ({
    subject: "Pro待機リストに登録されました！🎉",
    body: `こんにちは！\n\nCVMaker Pro ${plan}プランの待機リストにご登録いただきありがとうございます。\n\nプランが利用可能になり次第お知らせいたします。\n\nまたお会いしましょう！\nCVMakerチーム`,
  }),
  ko: (plan) => ({
    subject: "Pro 대기자 명단에 등록되었습니다! 🎉",
    body: `안녕하세요!\n\nCVMaker Pro ${plan} 플랜 대기자 명단에 등록해 주셔서 감사합니다.\n\n플랜이 제공되면 바로 알려드리겠습니다.\n\n곧 뵙겠습니다!\nCVMaker 팀`,
  }),
  hi: (plan) => ({
    subject: "आप Pro प्रतीक्षा सूची में हैं! 🎉",
    body: `नमस्ते!\n\nCVMaker Pro ${plan} योजना की प्रतीक्षा सूची में शामिल होने के लिए धन्यवाद।\n\nयोजना उपलब्ध होते ही हम आपको सूचित करेंगे।\n\nजल्द मिलते हैं!\nCVMaker टीम`,
  }),
  th: (plan) => ({
    subject: "คุณอยู่ในรายการรอ Pro แล้ว! 🎉",
    body: `สวัสดี!\n\nขอบคุณที่เข้าร่วมรายการรอสำหรับแผน CVMaker Pro ${plan}\n\nเราจะแจ้งให้คุณทราบทันทีที่แผนพร้อมใช้งาน\n\nแล้วพบกัน!\nทีม CVMaker`,
  }),
  vi: (plan) => ({
    subject: "Bạn đã vào danh sách chờ Pro! 🎉",
    body: `Xin chào!\n\nCảm ơn bạn đã đăng ký danh sách chờ gói CVMaker Pro ${plan}.\n\nChúng tôi sẽ thông báo cho bạn ngay khi gói có sẵn.\n\nHẹn gặp lại!\nĐội ngũ CVMaker`,
  }),
  id: (plan) => ({
    subject: "Anda ada di daftar tunggu Pro! 🎉",
    body: `Halo!\n\nTerima kasih telah bergabung dengan daftar tunggu paket CVMaker Pro ${plan}.\n\nKami akan memberi tahu Anda segera setelah paket tersedia.\n\nSampai jumpa!\nTim CVMaker`,
  }),
  ar: (plan) => ({
    subject: "أنت في قائمة انتظار Pro! 🎉",
    body: `مرحباً!\n\nشكراً لانضمامك إلى قائمة الانتظار لخطة CVMaker Pro ${plan}.\n\nسنُعلمك فور توفر الخطة.\n\nإلى اللقاء!\nفريق CVMaker`,
  }),
  he: (plan) => ({
    subject: "!אתה ברשימת ההמתנה של Pro 🎉",
    body: `שלום!\n\nתודה שהצטרפת לרשימת ההמתנה לתוכנית CVMaker Pro ${plan}.\n\nנודיע לך ברגע שהתוכנית תהיה זמינה.\n\n!להתראות\nצוות CVMaker`,
  }),
  tr: (plan) => ({
    subject: "Pro bekleme listesine eklendiniz! 🎉",
    body: `Merhaba!\n\nCVMaker Pro ${plan} planı bekleme listesine kaydolduğunuz için teşekkürler.\n\nPlan hazır olduğunda sizi bilgilendireceğiz.\n\nGörüşmek üzere!\nCVMaker Ekibi`,
  }),
  ru: (plan) => ({
    subject: "Вы в списке ожидания Pro! 🎉",
    body: `Привет!\n\nСпасибо за регистрацию в списке ожидания плана CVMaker Pro ${plan}.\n\nМы уведомим вас, как только план станет доступен.\n\nДо встречи!\nКоманда CVMaker`,
  }),
};

// Helper to format timestamp in Italian timezone (Europe/Rome)
function formatItalianTimestamp(date: Date): string {
  const italianFormatter = new Intl.DateTimeFormat("it-IT", {
    timeZone: "Europe/Rome",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return italianFormatter.format(date);
}

function getUserTemplate(lang: string, plan: string): EmailTemplate {
  const templateFn = userTemplates[lang] || userTemplates["en"];
  return templateFn(plan);
}

function getAdminTemplate(email: string, plan: string, lang: string, isUpdate: boolean, wasUpdated: boolean): EmailTemplate {
  const now = new Date();
  const italianTime = formatItalianTimestamp(now);
  const utcTime = now.toISOString();

  const updateStatus = isUpdate
    ? (wasUpdated ? "🔄 Aggiornamento (piano modificato)" : "🔄 Aggiornamento (stesso piano)")
    : "✨ Nuova iscrizione";

  return {
    subject: `🔔 ${isUpdate ? "Aggiornamento" : "Nuova iscrizione"} waitlist Pro: ${email}`,
    body: `${updateStatus}\n\n📧 Email: ${email}\n📋 Piano: ${plan}\n🌍 Lingua: ${lang}\n📅 Data IT: ${italianTime}\n🌐 Data UTC: ${utcTime}\n\n---\nQuesto messaggio è generato automaticamente dal sistema CVMaker.`,
  };
}

// ============================================
// Main handler
// ============================================

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, plan_type, language } = await req.json();

    // Validate input
    if (!email || !plan_type) {
      return new Response(
        JSON.stringify({ error: "Email and plan_type are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Enhanced email validation (RFC 5322 compliant)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email) || email.length > 254) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate plan_type (whitelist)
    if (!['monthly', 'annual'].includes(plan_type)) {
      return new Response(
        JSON.stringify({ error: "Invalid plan_type" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate language (whitelist of supported languages)
    const validLanguages = ['en', 'it', 'de', 'fr', 'es', 'pt', 'nl', 'pl', 'sv', 'da', 'no', 'fi', 'cs', 'el', 'ro', 'hu', 'bg', 'hr', 'sk', 'sr', 'lt', 'lv', 'et', 'sl', 'uk', 'ja', 'ko', 'zh', 'th', 'vi', 'id', 'ms'];
    const lang = validLanguages.includes(language) ? language : "en";

    const sanitizedEmail = email.toLowerCase().trim();
    const planLabel = plan_type === "annual" ? "Annual" : "Monthly";

    // Upsert into database (update if exists, insert if not)
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing environment variables:", { supabaseUrl: !!supabaseUrl, supabaseKey: !!supabaseKey });
      throw new Error("Missing required environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if email already exists to track updates
    const { data: existing } = await supabase
      .from("pro_waitlist")
      .select("email, plan_type")
      .eq("email", sanitizedEmail)
      .maybeSingle();

    const isUpdate = !!existing;
    const wasUpdated = isUpdate && existing?.plan_type !== plan_type;

    // Upsert: insert new or update existing entry with latest preferences
    const { error: upsertError } = await supabase
      .from("pro_waitlist")
      .upsert({
        email: sanitizedEmail,
        plan_type,
        language: lang,
      }, {
        onConflict: "email",
      });

    if (upsertError) {
      throw upsertError;
    }

    // Prepare email payloads (ready for external integration)
    const userEmail = getUserTemplate(lang, planLabel);
    const adminEmail = getAdminTemplate(sanitizedEmail, planLabel, lang, isUpdate, wasUpdated);

    // Log for external processing / webhook integration
    const emailPayload = {
      user_notification: {
        to: sanitizedEmail,
        subject: userEmail.subject,
        body: userEmail.body,
        language: lang,
      },
      admin_notification: {
        to: "dipuortoumberto@gmail.com",
        subject: adminEmail.subject,
        body: adminEmail.body,
      },
      metadata: {
        email: sanitizedEmail,
        plan_type,
        language: lang,
        is_update: isUpdate,
        was_plan_changed: wasUpdated,
        previous_plan: existing?.plan_type || null,
        timestamp_utc: new Date().toISOString(),
        timestamp_italian: formatItalianTimestamp(new Date()),
      },
    };

    // ============================================
    // 🔌 INTEGRATION POINT
    // Replace console.log with your email sending logic:
    //
    // Option A: HTTP webhook to your server
    //   await fetch("https://your-server.com/api/send-waitlist-emails", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json", "Authorization": "Bearer YOUR_KEY" },
    //     body: JSON.stringify(emailPayload),
    //   });
    //
    // Option B: Resend API
    //   await fetch("https://api.resend.com/emails", { ... });
    //
    // Option C: SMTP relay via your server
    // ============================================

    console.log("📧 WAITLIST_EMAIL_PAYLOAD:", JSON.stringify(emailPayload, null, 2));

    return new Response(
      JSON.stringify({
        success: true,
        is_update: isUpdate,
        was_plan_changed: wasUpdated,
        email_payload: emailPayload,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error("Waitlist error:", error);
    console.error("Error details:", {
      message: error.message,
      name: error.name,
      stack: error.stack || "No stack trace"
    });
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error.message
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
