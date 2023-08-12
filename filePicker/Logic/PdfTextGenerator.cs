using filePicker.Data;
using filePicker.Helpers;
using PdfSharp.Fonts;
using PdfSharp.Pdf;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tesseract;

namespace filePicker.Logic
{
    internal class PdfTextGenerator : IGenerator
    {
#if DEBUG
        private string path = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory.Split("\\bin")[0]);
#else
        private string path = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory);
#endif
        private readonly ImageLogic _imageLogic;
        private readonly IFolderPicker _folderPicker;

        public PdfTextGenerator(ImageLogic imageLogic, IFolderPicker folderPicker)
        {
            _imageLogic = imageLogic;
            _folderPicker = folderPicker;
        }
        public async Task<bool> Generate()
        {
            using (var engine = new TesseractEngine(Path.Combine(path, "dataTess"), "pol", EngineMode.TesseractAndLstm))
            {
                using (PdfDocument document = new())
                using (var stream = new MemoryStream())
                {
                    // dac na paraller
                    // poprawic clearowanie zdjec w folderze po kliknieciu clear , zeby usuwalo
                    GlobalFontSettings.FontResolver = new FileFontResolver();


                    foreach (var item in _imageLogic.GetAllArray())
                    {


                        using (var img = Pix.LoadFromFile(item.path))
                        {
                            using (var page = engine.Process(img))
                            {
                                var text = page.GetText();
                                PdfGeneratorHelper.GeneratePageWithText(document, text);
                                Console.WriteLine("Mean confidence: {0}", page.GetMeanConfidence());

                                Console.WriteLine("Text (GetText): \r\n{0}", text);
                                Console.WriteLine("Text (iterator):");
                            }
                        }
                    }
                    document.Save(stream);
                    CancellationTokenSource source = new();
                    CancellationToken token = source.Token;
                    string path = await _folderPicker.PickFile(stream, token);
                    return path != null;
                }
            }
        }
    }
}
