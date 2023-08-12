
using SkiaSharp;
using System.Drawing;
using System.Drawing.Imaging;

namespace filePicker.Extensions
{
    public static class ImageExtensions
    {
        public static string getBase64FromFile(this string path, int? width, int? height, int quality)
        {
            int widths, heights;
            var result = "";
            using (var input = File.OpenRead(path))
            using (var inputStream = new SKManagedStream(input))
            using (var codec = SKCodec.Create(inputStream))
            {
                var orientation = codec.EncodedOrigin;
                using (var original = AutoOrient(SKBitmap.Decode(codec), orientation))
                {
                    if (!width.HasValue && !height.HasValue)
                    {
                        widths = original.Width;
                        heights = original.Height;
                    }
                    else if (original.Width > original.Height)
                    {


                        widths = original.Width * height.Value / original.Height;
                        heights = height.Value;
                    }
                    else
                    {
                        widths = width.Value;
                        heights = original.Height * width.Value / original.Width;
                    }
                    using (var resized = original.Resize(new SKImageInfo(widths, heights), SKBitmapResizeMethod.Lanczos3))
                    using (var check = resized.Encode(SKEncodedImageFormat.Jpeg, quality))
                    {
                        original.Dispose();
                        var extension = path.Split('.')[1];
                        var base64 = Convert.ToBase64String(check.Span);
                        result = $"data:image/{Path.GetExtension(path)[1..]};base64,{base64}";
                        base64 = string.Empty;
                    }
                }     
            }
            GC.Collect();
            return result;
        }
        public static void CreateImage(this string path,string temp_path, int quality)
        {
            using (var input = File.OpenRead(temp_path))
            using (var codec = SKCodec.Create(input))
            using (var original = AutoOrient(SKBitmap.Decode(codec), codec.EncodedOrigin))
            using (var image = SKImage.FromBitmap(original))
            using (var data = image.Encode(SKEncodedImageFormat.Jpeg, quality))
            using (var stream = File.OpenWrite(path))
            {
                data.SaveTo(stream);

            }
            File.Delete(temp_path);
            
            GC.Collect();
        }
        public static void CreateImage(this string path, Stream temp_path, int quality)
        {
            using (var codec = SKCodec.Create(temp_path))
            using (var original = AutoOrient(SKBitmap.Decode(codec), codec.EncodedOrigin))
            using (var image = SKImage.FromBitmap(original))
            using (var data = image.Encode(SKEncodedImageFormat.Jpeg, quality))
            using (FileStream stream = new(path, FileMode.Create))
            {
                data.SaveTo(stream);

            }

            GC.Collect();
        }


        public static void RotateImageAfterRotate(this System.Drawing.Image img, int rotating)
        {
            foreach (var prop in img.PropertyItems)
            {
                if ((prop.Id == 0x0112 || prop.Id == 5029 || prop.Id == 274))
                {
                    var value = (int)prop.Value[0];
                    if (value == 6)
                    {

                        img.RotateFlip(RotateFlipType.Rotate90FlipNone);
                        break;
                    }
                    else if (value == 8)
                    {
                        img.RotateFlip(RotateFlipType.Rotate270FlipNone);
                        break;
                    }
                    else if (value == 3)
                    {
                        img.RotateFlip(RotateFlipType.Rotate180FlipNone);
                        break;
                    }
                }
            }
        }

        public static void RotateImageDestroy(this System.Drawing.Image img)
        {
            foreach (var prop in img.PropertyItems)
            {
                if ((prop.Id == 0x0112 || prop.Id == 5029 || prop.Id == 274))
                {
                    var propid = prop.Id;
                    img.RemovePropertyItem(propid);
                }
            }
        }


        private static SKBitmap? AutoOrient(SKBitmap bitmap, SKEncodedOrigin origin)
        {
            SKBitmap rotated;
            switch (origin)
            {
                case SKEncodedOrigin.BottomRight:
                    rotated = new SKBitmap(bitmap.Width, bitmap.Height);
                    using (var surface = new SKCanvas(rotated))
                    {
                        surface.RotateDegrees(180, bitmap.Width / 2, bitmap.Height / 2);
                        surface.DrawBitmap(bitmap, 0, 0);
                    }
                    return rotated;
                case SKEncodedOrigin.RightTop:
                    rotated = new SKBitmap(bitmap.Height, bitmap.Width);
                    using (var surface = new SKCanvas(rotated))
                    {
                        surface.Translate(rotated.Width, 0);
                        surface.RotateDegrees(90);
                        surface.DrawBitmap(bitmap, 0, 0);
                    }
                    return rotated;
                case SKEncodedOrigin.LeftBottom:
                    rotated = new SKBitmap(bitmap.Height, bitmap.Width);
                    using (var surface = new SKCanvas(rotated))
                    {
                        surface.Translate(0, rotated.Height);
                        surface.RotateDegrees(270);
                        surface.DrawBitmap(bitmap, 0, 0);
                    }
                    return rotated;
                default:
                    return bitmap;
            }
        }
    }
}
