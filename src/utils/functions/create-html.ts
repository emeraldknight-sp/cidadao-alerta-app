import { ReportProps } from "@/src/@types";

export const createHTML = (report: ReportProps, imageBase64: string) => {
  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body
        style="
          font-family: Arial, sans-serif;
          margin: 20px;
          padding: 20px;
          background-color: #f9f9f9;
          border: 1px solid #ccc;
          border-radius: 8px;
        "
      >
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td colspan="4" style="border: 1px solid #171717;">
              <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 8px;">
                <p style="text-align: center; font-size: 24px; color: #dc2626; font-weight: 700; ">Relatório de Comunicação de Problema</p>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="1" style="background-color: #262626; color: white; padding: 10px; border: 1px solid black;">
              <strong>Nome:</strong>
            </td>
            <td colspan="3" style="background-color: white; color: black; padding: 10px; border: 1px solid black;">
              ${report.name}
            </td>
          </tr>
          <tr>
            <td style="background-color: #262626; color: white; padding: 10px; border: 1px solid black;">
              <strong>Email:</strong>
            </td>
            <td style="background-color: white; color: black; padding: 10px; border: 1px solid black;">
              ${report.email}
            </td>
            <td style="background-color: #262626; color: white; padding: 10px; border: 1px solid black; border: 1px solid black;">
              <strong>Telefone:</strong>
            </td>
            <td style="background-color: white; color: black; padding: 10px; border: 1px solid black;">
              ${report.phone}
            </td>
          </tr>
          <tr>
            <td style="background-color: #262626; color: white; padding: 10px; border: 1px solid black;">
              <strong>Defeito:</strong>
            </td>
            <td style="background-color: white; color: black; padding: 10px; border: 1px solid black;">
              ${report.defect}
            </td>
            <td style="background-color: #262626; color: white; padding: 10px; border: 1px solid black;">
              <strong>Endereço:</strong>
            </td>
            <td style="background-color: white; color: black; padding: 10px; border: 1px solid black;" colspan="3">
              ${report.address}
            </td>
          </tr>
          <tr>
            <td style="max-width: 50px; background-color: #262626; color: white; padding: 10px; border: 1px solid black;">
              <strong>Ponto de referência:</strong>
            </td>
            <td style="background-color: white; color: black; padding: 10px; border: 1px solid black;" colspan="3">
              ${report.reference}
            </td>
          </tr>
        </table>
        <img
          src="data:image/png;base64,${imageBase64}"
          alt="imagem anexada"
          style="
            display: block;
            margin: 20px auto;
            border: 1px solid #ccc;
            border-radius: 5px;
            max-width: 70%;
            max-height: 60vh;
            object-fit: contain;
          "
        />
      </body>
    </html>
  `;
};
