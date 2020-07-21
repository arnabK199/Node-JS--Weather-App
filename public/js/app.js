const weaterForm = document.querySelector('form');
const searchLocation = document.querySelector('input');
const messageOne = document.getElementById('messageOne'); 
const messageTwo = document.getElementById('messageTwo'); 

const fetchUser = (e) => {
    e.preventDefault();

    const locValue = searchLocation.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`http://localhost:3001/weather?address=${locValue}`).then(response => response.json())
    .then(data=>{
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error;
        }else{
            messageOne.textContent = data.location;
            messageTwo.textContent = data.weather;
            console.log(data.weather);
            console.log(data.location);
        }
    })
}


weaterForm.addEventListener('submit', fetchUser)