using filePicker.Data;
using filePicker.Helpers;
using PdfSharp.Fonts;
using Tesseract;

namespace filePicker.Logic
{
    internal class ImageText
    {
#if DEBUG
        private string path = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory.Split("\\bin")[0]);
#else
        private string path = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory);
#endif

        public string GetText(string pathed)
        {
            using (var engine = new TesseractEngine(Path.Combine(path, "dataTess"), "pol", EngineMode.TesseractAndLstm))
            using (var img = Pix.LoadFromFile(pathed))
            using (var page = engine.Process(img))
            {
                return page.GetText();
            }
        }
        public string GetText(byte[] image)
        {
            using (var engine = new TesseractEngine(Path.Combine(path, "dataTess"), "pol", EngineMode.TesseractAndLstm))
            using (var img = Pix.LoadFromMemory(image))
            using (var page = engine.Process(img))
            {
                return page.GetText();
            }
        }
    }
}
