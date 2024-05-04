// modal input
    
    function setInitialContent() {
    var userWebsite = localStorage.getItem("linkWebsite"); 
    
    //$('#link').text(userWebsite);
    var defaultUrl = userWebsite + "?to=";
    var defaultTemplate = `
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
    var userWebsite = localStorage.getItem("linkWebsite"); 
    
    var namaTamu = document.getElementById("namaTamu").value;
    var urlAcara = userWebsite + "?to=" + encodeURIComponent(namaTamu);
    
    var updatedTemplate = `
    Kepada Yth.
    Bapa/Ibu/Saudara/i
    *${namaTamu}*
    _di tempat_
    
    Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i uuntuk menghadiri acara Resepsi Pernikahan Kami
    
    *Mempelai Pria & Wanita*
    
    * Hari/Tgl : 
    * Pukul : 
    * Tempat :
    
    Info lebih lengkap klik link di bawah ini 👇👇👇
    ${urlAcara}
    
    Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.
    
    Kami yang berbahagia,
    *Keluarga Kedua Mempelai*
    
    Mohon maaf perihal undangan hanya dibagikan melalui pesan ini dikarenakan keterbatasan jarak dan waktu.
    `;
    
    document.getElementById("templatePesan").value = updatedTemplate;
    document.getElementById("urlAcara").value = urlAcara;
    }
    
    var modal = document.getElementById("fullscreenModal");
    modal.addEventListener("shown.bs.modal", setInitialContent);
    