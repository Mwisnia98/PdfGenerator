using PdfSharp.Fonts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace filePicker.Logic
{
    public class FileFontResolver : IFontResolver // FontResolverBase
    {
        public string DefaultFontName => throw new NotImplementedException();

        public byte[] GetFont(string faceName)
        {
            using (var ms = new MemoryStream())
            {
                using (var fs = File.Open(faceName, FileMode.Open))
                {
                    fs.CopyTo(ms);
                    ms.Position = 0;
                    return ms.ToArray();
                }
            }
        }

#if DEBUG
        //AppDomain.CurrentDomain.BaseDirectory
        //private string path = System.IO.Path.Combine(FileSystem.Current.AppDataDirectory, "PickerFile");
        private string path = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory.Split("\\bin")[0]);
#else
    private string path = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory);
#endif

        public FontResolverInfo ResolveTypeface(string familyName, bool isBold, bool isItalic)
        {
            return new FontResolverInfo(Path.Combine(path, "Resources", "Fonts","OpenSans-Regular.ttf"));
            /*if (familyName.Equals("Verdana", StringComparison.CurrentCultureIgnoreCase))
            {
                if (isBold && isItalic)
                {
                    return new FontResolverInfo("Fonts/Verdana-BoldItalic.ttf");
                }
                else if (isBold)
                {
                    return new FontResolverInfo("Fonts/Verdana-Bold.ttf");
                }
                else if (isItalic)
                {
                    return new FontResolverInfo("Fonts/Verdana-Italic.ttf");
                }
                else
                {
                    return new FontResolverInfo("Fonts/Verdana-Regular.ttf");
                }
            }*/
            return null;
        }
    }
}
