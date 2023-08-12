using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace filePicker.Helpers
{
    internal static class FileHelper
    {
#if DEBUG
        //AppDomain.CurrentDomain.BaseDirectory
        //private string path = System.IO.Path.Combine(FileSystem.Current.AppDataDirectory, "PickerFile");
        public static string pathResource = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory.Split("\\bin")[0], "wwwroot");
#else
        public static string pathResource = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Resource");
#endif
    }
}
