using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace filePicker.Logic
{
    internal interface IGenerator
    {
        public Task<bool> Generate();
    }
}
