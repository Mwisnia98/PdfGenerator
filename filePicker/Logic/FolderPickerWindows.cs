using CommunityToolkit.Maui.Alerts;
using CommunityToolkit.Maui.Core;
using CommunityToolkit.Maui.Storage;
using Microsoft.Maui.Devices;
using Microsoft.Maui.Storage;

namespace filePicker.Logic
{
    internal class FolderPickerWindows : IFolderPicker
    {
        public async Task<string?> PickFile(Stream stream,CancellationToken cancellationToken)
        {
            var result = await FileSaver.Default.SaveAsync("PdfImages.pdf", stream, cancellationToken);
            if (result.IsSuccessful)
                return result.FilePath;
            return null;
           
        }

        public async Task<IEnumerable<FileResult>?> PickFiles(string title)
        {
            FilePickerFileType customFileType = new(new Dictionary<DevicePlatform, IEnumerable<string>>()
            {
                {DevicePlatform.WinUI, new[] {".jpg",".jpeg" } },
                {DevicePlatform.Unknown, new[] {".jpg",".jpeg" } }

            });
            PickOptions opt = new()
            {
                PickerTitle = title,
                FileTypes = customFileType
            };
            var result = await FilePicker.Default.PickMultipleAsync(opt);
            if (result is not null)
                return result;

            return null;
        }
    }
}
