import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, Link as LinkIcon, Sparkles } from "lucide-react";

export default function App() {
  const [url, setUrl] = useState("");

  const qrRef = useRef();

  const downloadQR = () => {
    const svg = qrRef.current.querySelector("svg");

    const serializer = new XMLSerializer();

    const svgString = serializer.serializeToString(svg);

    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    const img = new Image();

    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });

    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = 500;
      canvas.height = 500;

      ctx.drawImage(img, 0, 0);

      const png = canvas.toDataURL("image/png");

      const link = document.createElement("a");

      link.download = "BR30-QR-Code.png";

      link.href = png;

      link.click();

      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  return (
    <>
      <div className="app">
        <nav>
          <h2>
            BR30 <span>QR Studio</span>
          </h2>
        </nav>

        <section className="hero">
          <div className="title">
            <Sparkles size={30} />

            <h1>Create Stylish QR Codes</h1>
          </div>

          <p>Convert any link into a beautiful QR code instantly.</p>

          <div className="card">
            <div className="input-box">
              <LinkIcon />

              <input value={url} placeholder="Paste your link..." onChange={(e) => setUrl(e.target.value)} />
            </div>

            {url && (
              <div className="qr" ref={qrRef}>
                <QRCodeSVG value={url} size={240} />
              </div>
            )}

            {url && (
              <button onClick={downloadQR}>
                <Download size={20} />
                Download QR
              </button>
            )}
          </div>
        </section>

        <footer>© 2026 BR30 QR Studio</footer>

        <style>{`

*{
margin:0;
padding:0;
box-sizing:border-box;
}


body{

background:#020806;
color:white;
font-family:Inter,Arial,sans-serif;

}



nav{

height:80px;

display:flex;

align-items:center;

justify-content:center;

background:#03130d;

border-bottom:1px solid #00ff88;

}



nav h2{

font-size:32px;

font-weight:900;

}



nav span{

color:#00ff88;

}



.hero{

min-height:calc(100vh - 140px);

display:flex;

align-items:center;

justify-content:center;

flex-direction:column;

gap:20px;

padding:20px;

}



.title{

display:flex;

align-items:center;

gap:12px;

}



.title svg{

color:#00ff88;

}



.title h1{

font-size:48px;

}



.hero p{

color:#aaa;

font-size:18px;

}



.card{

margin-top:20px;

background:#07140f;

padding:35px;

border-radius:25px;

border:1px solid #00ff88;

box-shadow:0 0 40px #00ff8830;

text-align:center;

}



.input-box{

display:flex;

align-items:center;

gap:10px;

background:white;

padding:12px 18px;

border-radius:12px;

}



.input-box svg{

color:#00aa55;

}



input{

border:none;

outline:none;

width:320px;

font-size:16px;

}



.qr{

margin:30px auto;

background:white;

padding:20px;

width:max-content;

border-radius:20px;

}



button{

display:flex;

align-items:center;

justify-content:center;

gap:10px;

margin:auto;

background:#00ff88;

border:none;

padding:14px 25px;

border-radius:12px;

font-size:16px;

font-weight:800;

cursor:pointer;

}



button:hover{

transform:translateY(-3px);

}



footer{

padding:25px;

text-align:center;

color:#888;

}



@media(max-width:600px){

.title h1{

font-size:32px;

}


input{

width:220px;

}

}

*{
  margin:0;
  padding:0;
  box-sizing:border-box;

  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
  input,
textarea{
  -webkit-user-select:text;
  -moz-user-select:text;
  -ms-user-select:text;
  user-select:text;
}

`}</style>
      </div>
    </>
  );
}
