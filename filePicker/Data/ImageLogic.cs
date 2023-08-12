using filePicker.Logic;
using filePicker.Model;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace filePicker.Data
{
    internal class ImageLogic
    {
#if DEBUG
        //AppDomain.CurrentDomain.BaseDirectory
        //private string path = System.IO.Path.Combine(FileSystem.Current.AppDataDirectory, "PickerFile");
        private string path = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory.Split("\\bin")[0],"wwwroot", "PickerFile");
#else
        private string path = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "PickerFile");
#endif

        private List<ImageModel> ImageNames { get; set; } = new();
        public int PagginationCount { get; set; } = 10;
        public bool LoadedImages { get {
                return ImageNames.Count > 0;
            } }

        public ImageLogic()
        {

            if (Directory.Exists(path))
            {
                if (Directory.GetFiles(path).Length > 0)
                {
                    foreach (var item in Directory.GetFiles(path))
                    {
                        File.Delete(item);
                    }
                }
            }
        }

        public void RemoveImage(ImageModel img)
        {
            ImageNames.Remove(img);
            ImageNames = ImageNames.Select((z, idx) => z with { Index = idx }).ToList();
        }

        public void AddImage(ImageModel img)
        {
            img.path = System.IO.Path.Combine(path, img.Name);
            ImageNames.Add(img);
        }

        public void ClearAll()
        {
            if (Directory.Exists(path))
            {
                if (Directory.GetFiles(path).Length > 0)
                {
                    foreach (var item in Directory.GetFiles(path))
                    {
                        File.Delete(item);
                    }
                }
            }
            ImageNames = new();
        }


        public PaginatedList<ImageModel> GetPagginationImages(int page)
        {
            return new PaginatedList<ImageModel>(ImageNames.AsQueryable(), page, PagginationCount);
        }

        public void ChangeImage(string base64, string name)
        {
            File.Delete($@"{path}/{name}");
            var test = base64.Split(',')[1];
            Span<byte> image = Convert.FromBase64String(test);
            using (var ms = new MemoryStream(image.ToArray()))
            using (System.Drawing.Image img = System.Drawing.Image.FromStream(ms))
            using (var bitmap = new Bitmap(img, new System.Drawing.Size(img.Width, img.Height)))
            {
                bitmap.Save(filename: $@"{path}/{name}");
            }
            image.Clear();
            base64 = string.Empty;
            test = string.Empty;
        }

        public string GetPathToImage(string imageName)
        {
            return System.IO.Path.Combine(path, imageName);
        }
        public string GetBasePath()
        {
            return path;
        }

        public List<ImageModel> GetAllArray() => ImageNames;

    }
}
