using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace filePicker.Logic
{
    public interface IFolderPicker
    {
        Task<string> PickFile(Stream stream, CancellationToken cancellationToken);
        Task<IEnumerable<FileResult>> PickFiles(string title);


    }
}
