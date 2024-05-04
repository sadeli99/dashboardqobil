
     function logout() {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userFoto");
        localStorage.removeItem("guestLink");
        localStorage.removeItem("linkWebsite");
        
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
        
        
        $(document).ready(function() {
        if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html"; // Alihkan ke login jika tidak login
        } else {
        var userEmail = localStorage.getItem("userEmail");
        //$('#userEmail').text(userEmail);
        
           }
        });

    const endpointURL = 'https://script.google.com/macros/s/AKfycbzHnP7qdBudQaXKq6L2AyRAhwckwWwVyVDziTZQcm77rr_aAlpRaEB43Hhmb935TriE/exec'; // Ganti dengan URL dari Apps Script deployment

    function showToast(message) {
        const toast = new bootstrap.Toast(document.getElementById('notificationToast'));
        document.getElementById('toastMessage').textContent = message;
        toast.show();
    }
    
    
    
   
   // Fungsi untuk menyalin pesan ke clipboard
   function copyPesan(message) {
   navigator.clipboard.writeText(message)
   .then(() => {
   alert("Pesan disalin ke clipboard");
   })
   .catch(err => {
   console.error("Gagal menyalin teks: ", err);
   });
   }
    
    
    
    function loadGuests() {
        fetch(endpointURL)
            .then(response => response.json())
            .then(data => {
                const guestCardList = document.getElementById('guestCardList');
                guestCardList.innerHTML = ''; 
                
                // Kosongkan daftar sebelum menampilkan data baru
                 
                 data.forEach((guest, index) => {
                 const card = document.createElement("div");
                 card.className = "col-md-4";
                 
                 const cardInner = document.createElement("div");
                 cardInner.className = "card shadow-lg rounded-4 mb-3";
                 
                 const cardBody = document.createElement("div");
                 cardBody.className = "card-body p-4";
                 
                 const contentDiv = document.createElement("div");
                 contentDiv.className = "d-flex align-items-center";
                 
                 const textDiv = document.createElement("div");
                 
                 const title = document.createElement("h5");
                 title.className = "card-title title mb-3";
                 title.textContent = guest.name;
                
                
                  
                 const text = document.createElement("p");
                 text.className = "card-text subtitle text-truncated hideng-50";
                 text.style.display = "-webkit-box";
                 text.style.webkitLineClamp = "3";
                 text.style.webkitBoxOrient = "vertical";
                 text.style.overflow = "hidden";
                 text.textContent = guest.message;
                 
                 textDiv.appendChild(title);
                 textDiv.appendChild(text);
                 
                 
                 
                 const buttonDiv = document.createElement("div");
                 buttonDiv.className = "ms-auto mt-3";
                 
                  // button edit
                 
                 const editButton = document.createElement("button");
                 editButton.className = "btn btn-warning d-none"; // Diberikan sebagai placeholder
                 editButton.textContent = "Edit";
                 editButton.onclick = () => console.log(`Edit tamu ke-${index}`);
                 
                 // button delete
                 
                 const deleteButton = document.createElement("button");
                 deleteButton.className = "btn btn-danger";
                 deleteButton.textContent = "Hapus";
                 deleteButton.onclick= () => deleteGuest(index);

                  // button salin
                 
                 const copyButton = document.createElement("button");
                 copyButton.className = "btn btn-info ms-2";
                 copyButton.textContent = "Salin Pesan";
                 copyButton.onclick = () => copyPesan(guest.message);

                  // appen
                 
                 buttonDiv.appendChild(editButton);
                 buttonDiv.appendChild(deleteButton);
                 buttonDiv.appendChild(copyButton);
                 
                 contentDiv.appendChild(textDiv);
                 cardBody.appendChild(contentDiv);
                 cardBody.appendChild(buttonDiv);
                 
                 cardInner.appendChild(cardBody);
                 card.appendChild(cardInner);
                 
                 guestCardList.appendChild(card);
                 });
                 
                 document.getElementById('loading').style.display = 'none';

document.getElementById('daftartamu').style.display = 'flex';
                
            })
            .catch(error => {
                console.error('Error:', error);
                
            });
    }


    function addGuest(event) {
        event.preventDefault(); // Mencegah form mengirimkan data

        const submitBtn = document.getElementById('submitBtn');
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengirim...'; // Ubah tombol jadi loading

        const guestNameInput = document.getElementById('namaTamu');
        const guestMessageInput = document.getElementById('templatePesan');

        const guestName = guestNameInput.value;
        const guestMessage = guestMessageInput.value;

        if (guestName && guestMessage) {
            const payload = {
                action: 'create',
                name: guestName,
                message: guestMessage,
            };

            fetch(endpointURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            .then(response => response.text())
            .then(data => {
                console.log('Response:', data);

                // Kembalikan tombol submit ke awal
                submitBtn.textContent = 'Tambah Tamu';

                // Reset input fields
                guestNameInput.value = ''; 
                //guestMessageInput.value = '';

                // Perbarui daftar tamu
                loadGuests();

                // Tampilkan notifikasi
                showToast('Tamu berhasil ditambahkan');
            })
            .catch(error => {
                console.error('Error:', error);
                submitBtn.textContent = 'Tambah Tamu';
            });
        }
    }

    function editGuest(index) {
        const guestCardList = document.getElementById('guestCardList');
        const card = guestCardList.children[index];
        const name = card.querySelector('.card-title').textContent;
        const message = card.querySelector('.card-text').textContent;

        const guestNameInput = document.getElementById('namaTamu');
        const guestMessageInput = document.getElementById('templatePesan');

        guestNameInput.value = name;
        guestMessageInput.value = message;

        document.getElementById('submitBtn').textContent = 'Update'; // Ubah teks tombol

        guestForm.onsubmit = (event) => {
            event.preventDefault();

            const payload = {
                action: 'update',
                rowIndex: index,
                name: guestNameInput.value,
                message: guestMessageInput.value,
            };

            const submitBtn = document.getElementById('submitBtn');
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Memperbarui...'; // Loading saat mengupdate

            fetch(endpointURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            .then(response => response.text())
            .then(data => {
                console.log('Response:', data);

                // Kembalikan form dan tombol submit
                guestForm.onsubmit = addGuest;
                submitBtn.textContent = 'Tambah Tamu';

                guestNameInput.value = ''; 
                guestMessageInput.value = '';

                // Perbarui daftar tamu
                loadGuests();

                // Tampilkan notifikasi
                showToast('Data tamu berhasil diperbarui');
            })
            .catch(error => {
                console.error('Error:', error);
                submitBtn.textContent = 'Tambah Tamu';
            });
        };
    }

    function deleteGuest(index) {
        const payload = {
            action: 'delete',
            rowIndex: index,
        };

        fetch(endpointURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => response.text())
        .then(data => {
            console.log('Response:', data);

            loadGuests(); // Perbarui daftar tamu
            showToast('Data tamu berhasil dihapus');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Load daftar tamu saat halaman dimuat
    loadGuests();
    
    
    