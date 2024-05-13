// modal input
    
    function setInitialContent() {
    const userWebsite = localStorage.getItem("linkWebsite"); 
    
    //$('#link').text(userWebsite);
    const defaultUrl = userWebsite + "?to=";
    const defaultTemplate = `
    Kepada Yth.
    Bapa/Ibu/Saudara/i
    *{nama_tamu}*
    _di tempat_
    
    Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara Resepsi Pernikahan Kami
    
    *Mempelai Pria & Wanita*
    
    * Hari/Tgl : 
    * Pukul : 
    * Tempat :
    
    Info lebih lengkap klik link di bawah ini 👇👇👇
    ${defaultUrl}
    
    Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.
    
    Kami yang berbahagia,
    *Keluarga Kedua Mempelai*
    
    Mohon maaf perihal undangan hanya dibagikan melalui pesan ini dikarenakan keterbatasan jarak dan waktu.
    `;
    
    document.getElementById("templatePesan").value = defaultTemplate;
    document.getElementById("urlAcara").value = defaultUrl;
    }
    
    function updateTemplate() {
    const userWebsite = localStorage.getItem("linkWebsite"); 
    
    const namaTamu = document.getElementById("namaTamu").value;
    const urlAcara = userWebsite + "?to=" + encodeURIComponent(namaTamu);
    
    const updatedTemplate = "Kepada Yth.\n" +
    "Bapa/Ibu/Saudara/i\n" +
    "*"+namaTamu+"*\n" +
    "_di tempat_\n\n" +
    "Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara Resepsi Pernikahan Kami\n\n" +
    "*Mempelai Pria & Wanita*\n\n" +
    "* Hari/Tgl : \n" +
    "* Pukul : \n" +
    "* Tempat :\n\n" +
    "Info lebih lengkap klik link di bawah ini 👇👇👇\n" + ""+urlAcara+"" + "\n\n" +
    "Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.\n\n" +
    "Kami yang berbahagia,\n" +
    "*Keluarga Kedua Mempelai*\n\n" +
    "Mohon maaf perihal undangan hanya dibagikan melalui pesan ini dikarenakan keterbatasan jarak dan waktu.";
    
    document.getElementById("templatePesan").value = updatedTemplate;
    document.getElementById("urlAcara").value = urlAcara;
    }
    
    const modal = document.getElementById("fullscreenModal");
    modal.addEventListener("shown.bs.modal", setInitialContent);
    
    
    