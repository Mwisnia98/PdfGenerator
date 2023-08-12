namespace filePicker.Model;
public record class ImageModel
{
    public string Name { get; set; }
    public string ThumbnailBase64 { get; set; }
    public int Index { get; set; }
    public string path { get; set; }
}

