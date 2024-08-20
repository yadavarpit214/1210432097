function calculateAverage() {
    const input = document.getElementById('numbers').value;
    const numbers = input.split(',').map(Number);

    if (numbers.length !== 10) {
        document.getElementById('result').innerHTML = "Please enter exactly 10 numbers.";
        return;
    }

    const sum = numbers.reduce((total, num) => total + num, 0);
    const average = sum / numbers.length;

    document.getElementById('result').innerHTML = `The average is: ${average.toFixed(2)}`;
}
