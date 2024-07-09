import { Box, Button } from "@chakra-ui/react";
import QRCode from "react-qr-code";

export function generateCode(code: number) {
  const handleDownload = () => {
    const svg = document.getElementById("QRCODE");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const img = new Image();
        img.onload = () => {
          const padding = 20;
          const width = img.width + padding * 2;
          const height = img.height + padding * 2;

          canvas.width = width;
          canvas.height = height;

          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, width, height);

          ctx.drawImage(img, padding, padding);

          const pngFile = canvas.toDataURL("image/png");

          const link = document.createElement("a");
          link.href = pngFile;
          link.download = "qrcode_" + code + ".png";
          link.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
      }
    }
  };

  return (
    <>
      <Box bg={"white"} p={5} borderRadius={5}>
        <QRCode value={`${code}`} id="QRCODE" />
      </Box>
      <Button onClick={handleDownload} colorScheme="teal">
        Baixar
      </Button>
    </>
  );
}
