function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
     localStorage.removeItem("userFoto");
     localStorage.removeItem("guestLink");
     
     // Perbaikan penggunaan removeItem
}
    $(document).ready(function() {
    var userFoto = localStorage.getItem("userFoto"); // Ambil URL foto dari localStorage
    
    if (userFoto) { // Jika data tersedia
    $('#profileImage').attr('src', userFoto); // Setel URL gambar
    } else {
    console.warn("No photo URL found in localStorage");
    }
    });
    

    
    document.addEventListener('DOMContentLoaded', () => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn !== "true") {
            window.location.href = "login.html";
        } else {
            const guestLink = localStorage.getItem("guestLink");
    

            if (guestLink) {
                document.getElementById('guestLink').innerHTML = `<a href="${guestLink}" target="_blank">URL Tamu</a>`;

                fetch(`${guestLink}?action=read`, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    if (data.records && data.records.length > 0) {
                        // Urutkan berdasarkan tanggal (terbaru di atas)
                        data.records.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

                        let totalGuests = 0;

                        data.records.forEach((record) => {
                            const tanggal = new Date(record.tanggal);
                            const inisial = record.nama.charAt(0).toUpperCase();

                            const timeAgoText = timeAgo(tanggal);

                            let kehadiranClass = 'kehadiran';
                            if (record.kehadiran === 'Hadir') {
                                kehadiranClass += ' hadir';
                            } else if (record.kehadiran === 'Berhalangan') {
                                kehadiranClass += ' berhalangan';
                            } else {
                                kehadiranClass += ' default-bg';
                            }

                            const kehadiranLabel = `<span class="${kehadiranClass}">${record.kehadiran || 'Tidak diketahui'}</span>`;

                            const rsvpCard = `
                            <div class="col-12 col-md-12">
                                <div class="card shadow-lg rounded-4 mb-5">
                                    <div class="card-body p-6">
                                        <div class="d-flex align-items-center">
                                            <div class="buled text-white text-center title" style="width: 40px; height: 40px; line-height: 40px; padding-top: 3px;">${inisial}</div>
                                            <div class="ms-3">
                                                <h5 class="card-title title mb-1 mt-2" style="font-size: 1.1em;">${record.nama}</h5>
                                                <small class="subtitle hideng-50">${timeAgoText}</small>
                                            </div>
                                        </div>
                                        <p class="mt-4 subtitle">${record.pesan}</p>
                                   <div class="d-flex align-items-center">
                                        <button class="btn read-more subtitle" onclick="toggleReadMore(this)" style="display: none; margin-left: -12px; color: #9AA8BC; opacity: 0.8; font-size: 0.8em">Tampilkan semua</button> <!-- Tombol Read More -->
                                      <small class="subtitle hideng-50 ms-auto">${kehadiranLabel}</small>
                                     </div>
                                    </div>
                                </div>
                            </div>`;

                            document.getElementById('rsvpData').insertAdjacentHTML('beforeend', rsvpCard); // Tambahkan kartu RSVP
                            totalGuests++;
                        });

                        document.getElementById('totalGuests').textContent = totalGuests;
                        document.getElementById('loading').style.display = 'none';
                        document.getElementById('rsvpData').style.display = 'flex';
                        document.getElementById('titles').style.display = 'flex';

                        document.getElementById('noDataMessage').style.display = 'none'; // Sembunyikan pesan tidak ada data
                        checkIfReadMoreIsNeeded(); // Periksa apakah tombol Read More diperlukan

                    } else {
                        // Jika tidak ada data RSVP
                        document.getElementById('rsvpData').style.display = 'none';
                        document.getElementById('noDataMessage').style.display = 'block'; // Tampilkan pesan tidak ada data
                    }
                })
                .catch(error => {
                    console.error("Error retrieving RSVP data:", error);
                });
            } else {
                document.getElementById('guestLink').innerHTML = "URL tamu tidak ditemukan.";
            }
        }
    });
    
    // readmore card //

    

   
    
    // tanggal di dalam card //

    function timeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        const intervals = [
            { label: 'tahun', seconds: 31536000 },
            { label: 'bulan', seconds: 2592000 },
            { label: 'minggu', seconds: 604800 },
            { label: 'hari', seconds: 86400 },
            { label: 'jam', seconds: 3600 },
            { label: 'menit', seconds: 60 },
            { label: 'detik', seconds: 1 },
        ];

        for (const interval of intervals) {
            const count = Math.floor(diffInSeconds / interval.seconds);
            if (count >= 1) {
                return `${count} ${interval.label} yang lalu`;
            }
        }

        return "Baru saja"; // Default jika perbedaan waktu sangat kecil
    }
    