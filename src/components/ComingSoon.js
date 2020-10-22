const s = 1000,
    m = s * 60,
    h = m * 60,
    d = h * 24,
    y = d * 365;

function counting() {
    const days = document.getElementById('days'),
        hours = document.getElementById('hours'),
        minutes = document.getElementById('minutes'),
        seconds = document.getElementById('seconds'),
        timeNow = new Date().getTime(),
        setDate = new Date('01/01/2021').getTime(),
        diff = setDate - timeNow;

    days.innerText = Math.floor(diff / d);
    hours.innerText = Math.floor((diff % d) / h);
    minutes.innerText = Math.floor((diff % h) / m);
    seconds.innerText = Math.floor((diff % m) / s);
    // console.log(Math.floor(diff / (d * 365)));

}
setInterval(() => {
    counting();
}, 1000);


const formAddDate = document.getElementById('addDate');
formAddDate.addEventListener('submit', addTime);

function addTime(e) {
    const date = document.getElementById('date').value,
        time = document.getElementById('time').value,
        timeYears = document.getElementById('time-years'),
        timeDays = document.getElementById('time-days'),
        timeHours = document.getElementById('time-hours'),
        timeMinutes = document.getElementById('time-minutes'),
        timeSeconds = document.getElementById('time-seconds');

    if (date && time) {
        const chosenDate = new Date(`${date} ${time}`)
        document.getElementById('until').innerText = chosenDate.toUTCString();

        const hidden = document.querySelectorAll('.hidden');
        hidden.forEach(el => el.style.display = 'block');

        const interval = setInterval(() => {
            const pickedDate = new Date(`${date} ${time}`).getTime(),
                currentDate = new Date().getTime(),
                difference = pickedDate - currentDate,
                years = Math.floor(difference / y);

            if (years < 1) {
                timeYears.parentElement.style.display = 'none';
            } else {
                timeYears.parentElement.style.display = 'block';

            }
            timeYears.innerHTML = Math.floor(difference / y);
            timeDays.innerHTML = Math.floor((difference % y) / d);
            timeHours.innerHTML = Math.floor((difference % d) / h);
            timeMinutes.innerHTML = Math.floor((difference % h) / m);
            timeSeconds.innerHTML = Math.floor((difference % m) / s);
        }, 1000);

        document.querySelector('button').addEventListener('click', () => {
            clearInterval(interval);
        });

        formAddDate.reset();
    }
    e.preventDefault();
}



<div class="container">
    <h5>Add Date</h5>
    <form id="addDate">
        <input type="date" name="date" id="date">
        <input type="time" name="time" id="time">
        <button type="submit">Submit</button>
    </form>
    <p class="hidden">You have</p>
    <div class="pickedTime">

        <div class="time">
            <span id="time-years">-</span>
            <p>Years</p>
        </div> <!-- time -->

        <div class="time">
            <span id="time-days">-</span>
            <p>Days</p>
        </div> <!-- time -->

        <div class="time">
            <span id="time-hours">-</span>
            <p>Hours</p>
        </div> <!-- time -->

        <div class="time">
            <span id="time-minutes">-</span>
            <p>Minutes</p>
        </div> <!-- time -->

        <div class="time">
            <span id="time-seconds">-</span>
            <p>Seconds</p>
        </div> <!-- time -->

    </div> <!-- pickedTime -->
    <p class="hidden">Until: <span id="until"></span></p>

    <h1>Coming soon</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam praesentium impedit temporibus accusantium
        distinctio consectetur nam, architecto blanditiis laboriosam! Quasi ducimus dolor iste fugiat doloremque
        quia
        non velit, nulla deserunt ratione harum debitis nemo porro?</p>
    <div class="boxes">
        <div class="box">
            <span id="days">-</span>
            <p>Days</p>
        </div> <!-- box -->

        <div class="box">
            <span id="hours">-</span>
            <p>Hours</p>
        </div> <!-- box -->

        <div class="box">
            <span id="minutes">-</span>
            <p>Minutes</p>
        </div> <!-- box -->

        <div class="box">
            <span id="seconds">-</span>
            <p>Seconds</p>
        </div> <!-- box -->

    </div> <!-- boxes -->
</div> <!-- container --></form>