<p align="center"><a target="_blank" href="https://chromewebstore.google.com/detail/scroll-minimap-for-chatgp/apekbedjllgmacohbcckgipfhjddehkf"><img src="./src/assets/genz-screenreader-logo.png" height=100 ></a></p>
<h1 align="center"> Subway Surfers Screen Reader </h1>
<p align="center"><a target="_blank" href="https://chromewebstore.google.com/detail/subway-surfers-screen-rea/jcijfneifjnhbgahlokgkmpcnocgpegd"><img src="https://img.shields.io/badge/Chrome%20Web%20Store-4285F4?logo=chromewebstore&logoColor=fff&style=for-the-badge" /></a></p>
<p align="center">Screen reader extension with subway surfers playing in the sidepanel.</p>


[![unnamed](./thumbnail.png)](https://chromewebstore.google.com/detail/subway-surfers-screen-rea/jcijfneifjnhbgahlokgkmpcnocgpegd) | <video src="https://github.com/user-attachments/assets/7fca8c54-1b72-43c0-af0a-71233902a4f7.mp4" />
-|-

## Installation


<table>
<tr>
<td width="5%"> Step </td> <td width="20%"> Description </td> <td width="75%" > Action</td>
</tr>
<tr>
<td colspan="3" > <b>Local project setup</b></td>
</tr>
<tr>
<td> 1 </td>
<td>Clone the repo in the terminal</td>
<td>
    
```bash
git clone https://github.com/Aebel-Shajan/subway_surfers_screen_reader.git
```

</td>
</tr>
<tr>
<td> 2 </td>
<td>`cd` into project folder</td>
<td>
    
```bash
cd subway_surfers_screen_reader
```

</td>
</tr>
<tr>
<td> 3 </td>
<td> Install the npm dependencies </td>
<td>

```bash
npm install
```
    
</td>
</tr>
<tr>
<td> 4 </td>
<td> Build the extension </td>
<td>

```bash
npm run build
```

</td>
</tr>
<tr>
<td colspan="3" > <b>Loading the extension into chrome</b></td>
</tr>
</table>



2. Open Google Chrome and go to `chrome://extensions`.

3. Enable Developer mode by toggling the switch in the top right corner.

4. Click on "Load unpacked" and select "subway_surfers_screen_reader/build".

5. The extension should now be installed and visible in the extensions list.

## Usage

1. right click > click 'Read website'

or

1. select text > right click > click 'Read selection'

or

1. clicke the icon in the toolbar and past text into the sidepanel.

2. press play to start tts (disables text area)
3. press stop to stop tts (enables text area)

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

