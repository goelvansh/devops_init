document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/') 
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(`Data from Backend: ${data.message}`);
        })
        .catch(error => console.error('Error fetching data:', error));
});
