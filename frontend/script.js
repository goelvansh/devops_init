document.addEventListener('DOMContentLoaded', function() {
    fetch('http://backend:3000/api/data')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(`Data from Backend: ${data.message}`);
        })
        .catch(error => console.error('Error fetching data:', error));
});
