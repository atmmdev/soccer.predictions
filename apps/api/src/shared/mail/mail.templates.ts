export type MailTemplate = {
  subject: string;
  html: string;
};

function brandLogoUrl(webOrigin: string): string {
  return new URL('/brand/logomarca.png', webOrigin).toString();
}

function wrapEmail(params: {
  title: string;
  bodyHtml: string;
  webOrigin: string;
}): string {
  const logoUrl = brandLogoUrl(params.webOrigin);

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${params.title}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#18181b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;background:#ffffff;border-radius:12px;padding:32px;border:1px solid #e4e4e7;">
          <tr>
            <td>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 24px;">
                <tr>
                  <td align="center" style="text-align:center;">
                    <img
                      src="${logoUrl}"
                      alt="Soccer Predictions"
                      width="160"
                      height="46"
                      style="display:block;margin:0 auto 12px;width:160px;height:auto;border:0;outline:none;text-decoration:none;"
                    />
                    <p style="margin:0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#71717a;text-align:center;">
                      Soccer Predictions
                    </p>
                  </td>
                </tr>
              </table>
              <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;">${params.title}</h1>
              ${params.bodyHtml}
              ${observationNote(
                'Se você não solicitou esta mensagem, pode ignorá-la com segurança.',
                { marginTop: '24px', fontSize: '12px' },
              )}
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
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:24px 0;">
  <tr>
    <td align="center" bgcolor="#22c55e" style="background-color:#22c55e;border-radius:12px;">
      <a href="${url}" style="display:block;width:100%;box-sizing:border-box;padding:14px 20px;font-size:14px;line-height:1.2;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#ffffff;text-decoration:none;text-align:center;border-radius:12px;">
        ${label}
      </a>
    </td>
  </tr>
</table>`;
}

function observationNote(text: string, options?: { marginTop?: string; fontSize?: string }): string {
  const marginTop = options?.marginTop ?? '16px';
  const fontSize = options?.fontSize ?? '13px';

  return `<p style="margin:${marginTop} 0 0;font-size:${fontSize};line-height:1.5;color:#dc2626;text-align:center;">
      ${text}
    </p>`;
}

export function welcomeVerifyEmail(params: {
  name: string;
  verifyUrl: string;
  webOrigin: string;
}): MailTemplate {
  const subject = 'Confirme sua conta no Soccer Predictions';
  const html = wrapEmail({
    title: `Bem-vindo(a), ${params.name}!`,
    webOrigin: params.webOrigin,
    bodyHtml: `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#3f3f46;">
      Sua conta foi criada com sucesso. Para começar a usar o Soccer Predictions,
      confirme seu e-mail clicando no botão abaixo.
    </p>
    ${ctaButton('Validar e-mail', params.verifyUrl)}
    ${observationNote('Este link expira em 24 horas.')}`,
  });

  return { subject, html };
}

export function passwordResetEmail(params: {
  name: string;
  resetUrl: string;
  webOrigin: string;
}): MailTemplate {
  const subject = 'Redefinição de senha — Soccer Predictions';
  const html = wrapEmail({
    title: 'Redefinir senha',
    webOrigin: params.webOrigin,
    bodyHtml: `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#3f3f46;">
      Olá, ${params.name}. Recebemos uma solicitação para redefinir a senha da sua conta.
    </p>
    ${ctaButton('Redefinir senha', params.resetUrl)}
    ${observationNote('Este link expira em 1 hora.')}`,
  });

  return { subject, html };
}

export function passwordChangedEmail(params: {
  name: string;
  webOrigin: string;
}): MailTemplate {
  const subject = 'Sua senha foi alterada — Soccer Predictions';
  const html = wrapEmail({
    title: 'Senha alterada',
    webOrigin: params.webOrigin,
    bodyHtml: `    <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#3f3f46;">
      Olá, ${params.name}. A senha da sua conta no Soccer Predictions foi alterada com sucesso.
    </p>
    ${observationNote(
      'Se não foi você, use a opção “Esqueceu a senha?” na tela de login imediatamente ou entre em contato com o administrador do bolão.',
      { marginTop: '0', fontSize: '14px' },
    )}`,
  });

  return { subject, html };
}

export function predictionReminderEmail(params: {
  name: string;
  predictionsUrl: string;
  webOrigin: string;
  fixtures: Array<{
    homeTeam: string;
    awayTeam: string;
    kickoffLabel: string;
    poolName: string;
  }>;
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

  const html = wrapEmail({
    title: 'Você tem jogos sem palpite',
    webOrigin: params.webOrigin,
    bodyHtml: `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#3f3f46;">
      Olá, ${params.name}. Há partidas nas próximas 24 horas em que você ainda não cadastrou palpite.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:8px 0 0;">
      ${rows}
    </table>
    ${ctaButton('Cadastrar palpites', params.predictionsUrl)}`,
  });

  return { subject, html };
}
