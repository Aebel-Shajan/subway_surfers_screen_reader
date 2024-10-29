<p align="center"><a target="_blank" href="https://chromewebstore.google.com/detail/scroll-minimap-for-chatgp/apekbedjllgmacohbcckgipfhjddehkf"><img src="./src/assets/genz-screenreader-logo.png" height=100 ></a></p>
<h1 align="center"> Subway Surfers Screen Reader </h1>
<p align="center"><a target="_blank" href="https://chromewebstore.google.com/detail/subway-surfers-screen-rea/jcijfneifjnhbgahlokgkmpcnocgpegd"><img src="https://img.shields.io/badge/Chrome%20Web%20Store-4285F4?logo=chromewebstore&logoColor=fff&style=for-the-badge" /></a></p>
<p align="center">Screen reader extension with subway surfers playing in the sidepanel.</p>


[![unnamed](./thumbnail.png)](https://chromewebstore.google.com/detail/subway-surfers-screen-rea/jcijfneifjnhbgahlokgkmpcnocgpegd) | <video src="https://github.com/user-attachments/assets/7fca8c54-1b72-43c0-af0a-71233902a4f7.mp4" />
-|-

## Installation

### Prerequisites
Note you muse have the following installed before proceeding:
* [Node](https://nodejs.org/en)
* [git](https://git-scm.com/downloads)
* [Chrome](https://www.google.com/chrome/)

To preview and develop the extension locallly follow these steps:

<table width="100%">
<tr>
<td width="2%">  </td> <td width="28%"> Description </td> <td width="70%" > Action</td>
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
<td> cd into project folder</td>
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
<tr>
<td> 5 </td>
<td> Open google chrome and go to the url: </td>
<td>

```bash
chrome://extensions
```
</td>
</tr>
<tr>
<td> 6 </td>
<td> Enable developer mode by toggling the switch in the right corner</td>
<td><img src="https://github.com/user-attachments/assets/1bb92d7c-39fc-4cf5-af4e-22f9636375d6"></td>
</tr>
<tr>
<td> 7 </td>
<td > 
    
Click on `Load unpacked` and select the folder "subway_surfers_screen_reader/build"

</td>
<td><img width="100%" src="https://github.com/user-attachments/assets/214a789a-1352-474d-98f7-17c4cd5439dd"></img></td>
</tr>
<tr><td colspan="3" align="center"><b>🎉 The extension should be installed locally in chrome 🎉</b></td></tr>
</table>

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

