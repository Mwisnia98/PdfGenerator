using CommunityToolkit.Maui.Storage;
using filePicker.Data;
using filePicker.Helpers;
using PdfSharp.Pdf;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace filePicker.Logic
{
    internal class PdfImageGenerator : IGenerator
    {
        private readonly ImageLogic _imageLogic;
        private readonly IFolderPicker _folderPicker;

        public PdfImageGenerator(ImageLogic imageLogic, IFolderPicker folderPicker)
        {
            _imageLogic = imageLogic;
            _folderPicker = folderPicker;
        }

        public async Task<bool> Generate()
        {
            CancellationTokenSource source = new();
            CancellationToken token = source.Token;


            using (PdfDocument document = new())
            using (var stream = new MemoryStream())
            {

                foreach (var img in _imageLogic.GetAllArray())
                {
                    PdfGeneratorHelper.GeneratePageWithImage(document, _imageLogic.GetPathToImage(img.Name));
                }
                document.Save(stream);

                string path = await _folderPicker.PickFile(stream, token);

                return path != null;

            }
        }
    }
}
