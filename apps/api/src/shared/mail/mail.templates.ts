export type MailTemplate = {
  subject: string;
  html: string;
};

function wrapEmail(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#18181b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;background:#ffffff;border-radius:12px;padding:32px;border:1px solid #e4e4e7;">
          <tr>
            <td>
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#71717a;">Soccer Predictions</p>
              <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;">${title}</h1>
              ${bodyHtml}
              <p style="margin:24px 0 0;font-size:12px;line-height:1.5;color:#a1a1aa;">
                Se você não solicitou esta mensagem, pode ignorá-la com segurança.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function ctaButton(label: string, url: string): string {
  return `<p style="margin:24px 0;">
  <a href="${url}" style="display:inline-block;background:#16a34a;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600;font-size:14px;">
    ${label}
  </a>
</p>
<p style="margin:0;font-size:12px;line-height:1.5;color:#71717a;word-break:break-all;">
  Ou copie e cole no navegador:<br />${url}
</p>`;
}

export function welcomeVerifyEmail(params: {
  name: string;
  verifyUrl: string;
}): MailTemplate {
  const subject = 'Confirme sua conta no Soccer Predictions';
  const html = wrapEmail(
    `Bem-vindo(a), ${params.name}!`,
    `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#3f3f46;">
      Sua conta foi criada com sucesso. Para começar a usar o Soccer Predictions,
      confirme seu e-mail clicando no botão abaixo.
    </p>
    ${ctaButton('Validar e-mail', params.verifyUrl)}
    <p style="margin:16px 0 0;font-size:13px;line-height:1.5;color:#71717a;">
      Este link expira em 24 horas.
    </p>`,
  );

  return { subject, html };
}

export function passwordResetEmail(params: {
  name: string;
  resetUrl: string;
}): MailTemplate {
  const subject = 'Redefinição de senha — Soccer Predictions';
  const html = wrapEmail(
    'Redefinir senha',
    `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#3f3f46;">
      Olá, ${params.name}. Recebemos uma solicitação para redefinir a senha da sua conta.
    </p>
    ${ctaButton('Redefinir senha', params.resetUrl)}
    <p style="margin:16px 0 0;font-size:13px;line-height:1.5;color:#71717a;">
      Este link expira em 1 hora.
    </p>`,
  );

  return { subject, html };
}

export function passwordChangedEmail(params: { name: string }): MailTemplate {
  const subject = 'Sua senha foi alterada — Soccer Predictions';
  const html = wrapEmail(
    'Senha alterada',
    `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#3f3f46;">
      Olá, ${params.name}. A senha da sua conta no Soccer Predictions foi alterada com sucesso.
    </p>
    <p style="margin:0;font-size:15px;line-height:1.6;color:#3f3f46;">
      Se não foi você, use a opção “Esqueceu a senha?” na tela de login imediatamente
      ou entre em contato com o administrador do bolão.
    </p>`,
  );

  return { subject, html };
}

export function predictionReminderEmail(params: {
  name: string;
  predictionsUrl: string;
  fixtures: Array<{ homeTeam: string; awayTeam: string; kickoffLabel: string; poolName: string }>;
}): MailTemplate {
  const subject = 'Lembrete: cadastre seus palpites';
  const rows = params.fixtures
    .map(
      (fixture) => `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #f4f4f5;font-size:14px;line-height:1.4;">
          <strong>${fixture.homeTeam} × ${fixture.awayTeam}</strong><br />
          <span style="color:#71717a;font-size:12px;">${fixture.kickoffLabel} · ${fixture.poolName}</span>
        </td>
      </tr>`,
    )
    .join('');

  const html = wrapEmail(
    'Você tem jogos sem palpite',
    `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#3f3f46;">
      Olá, ${params.name}. Há partidas nas próximas 24 horas em que você ainda não cadastrou palpite.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:8px 0 0;">
      ${rows}
    </table>
    ${ctaButton('Cadastrar palpites', params.predictionsUrl)}`,
  );

  return { subject, html };
}
