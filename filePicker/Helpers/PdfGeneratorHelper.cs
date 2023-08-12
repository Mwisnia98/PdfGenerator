
using filePicker.Logic;
using PdfSharp.Drawing;
using PdfSharp.Drawing.Layout;
using PdfSharp.Fonts;
using PdfSharp.Pdf;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace filePicker.Helpers
{
    internal class PdfGeneratorHelper
    {



        public static PdfDocument GeneratePageWithImage(PdfDocument doc,string path)
        {
            PdfPage page = doc.AddPage();
            using (XGraphics gfx = XGraphics.FromPdfPage(page))
            {

                DrawImage(gfx, path);
            }
            page.Close();
            return doc;
        }

        private static void DrawImage(XGraphics gfx, string stream )
        {

            using (XImage image = XImage.FromFile(stream))
            {
                var imageHeight = image.PixelHeight;
                var imageWidth = image.PixelWidth;
                int height;
                int width;
                int x;
                int y;

                width = 500;
                height = (int)Math.Ceiling((double)width * imageHeight / imageWidth);

                x = 50;
                y = (int)Math.Ceiling((800 - height) / 2.0);

                if (height > 800)
                {
                    height = 800;
                    width = (int)Math.Ceiling(imageWidth * (double)height / imageHeight);

                    y = 50;
                    x = (int)Math.Ceiling((600 - width) / 2.0);
                }

                gfx.DrawImage(image, x, y, width, height);
            }
        }

        public static PdfDocument GeneratePageWithText(PdfDocument doc, string text)
        {
            
            PdfPage page = doc.AddPage();
            int height;
            int width;
            int x;
            int y;

            width = 600;
            height = 800;

            x = 50;
            y = 50;

            XGraphics gfx = XGraphics.FromPdfPage(page);
            XFont font = new XFont("arial", 12.0);
            XTextFormatter tf = new XTextFormatter(gfx);

            XRect rect = new XRect(x, y, width, height);
            gfx.DrawRectangle(XBrushes.SeaShell, rect);
            tf.DrawString(text, font, XBrushes.Black, rect, XStringFormats.TopLeft);
            page.Close();
            return doc;
        }
    }
}
