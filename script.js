document.write("Chapter 2 Exercise 3")


for (var number = 1; number <= 100; number += 1){
    if ((number % 5 != 0) && (number % 3 != 0)){
	document.write(number)
    }else if((number % 5 != 0) && (number % 3 == 0)){
	document.write("Fizz")
    }else if((number % 5 == 0) && (number % 3 != 0)){
	document.write("Buzz")
    }
    else if((number % 5 == 0) && (number % 3 == 0)){
	document.write("FizzBuzz")
    }
}
