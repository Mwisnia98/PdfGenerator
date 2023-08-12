using Microsoft.AspNetCore.Components.WebView.Maui;
using filePicker.Data;
using filePicker.Logic;
using CommunityToolkit.Maui.Storage;
using CommunityToolkit.Maui;

namespace filePicker;

public static class MauiProgram
{
	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder
			.UseMauiApp<App>()
			.ConfigureFonts(fonts =>
			{
				fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
			})
            .UseMauiCommunityToolkit();

		builder.Services.AddMauiBlazorWebView();
		#if DEBUG
		builder.Services.AddBlazorWebViewDeveloperTools();
#endif
		
		builder.Services.AddSingleton<WeatherForecastService>();
        builder.Services.AddSingleton<ImageLogic>();

        builder.Services.AddSingleton<Logic.IFolderPicker, FolderPickerWindows>();

        return builder.Build();
	}
}
