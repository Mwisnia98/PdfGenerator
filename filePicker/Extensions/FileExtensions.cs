using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace filePicker.Extensions
{
    internal static class FileExtensions
    {
        public static async Task CopyFileAndRemoveOrientation(this IEnumerable<FileResult> fileResults, string pathBase)
        {
            await Parallel.ForEachAsync(fileResults.Select((z, idx) => (z, idx)), async (resulted, a) =>
            {
                using (var file = File.OpenRead(resulted.z.FullPath))
                { 
                    Path.Combine(pathBase, resulted.z.FileName).CreateImage(file, 100);
                }
            });
        }
    }
}
