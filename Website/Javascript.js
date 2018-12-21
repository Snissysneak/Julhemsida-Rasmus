//Detta kommer och ladda in funktionen på sartup när sidan startas
window.onload = function(){
	//Kollar efter id snoweffect i html koden
	var canvas = document.getElementById("snoweffect");
	var ctx = canvas.getContext("2d");

  //Detta sätter width och height på objektet med id snoweffect till storleken på användares skärm
	var Wc = window.innerWidth;
	var Hc = window.innerHeight;
	canvas.width = Wc;
	canvas.height = Hc;

  //Detta sätter antal partiklar (antal snöflingor) på skärmen
	var mp = 150;
  //Gär en array för att spara alla snöflingor
	var particles = [];
	for(var i = 0; i < mp; i++)
	{
    //skicakr tu partiklarna på skärmen
		particles.push({
      //6randomizar ett x, y, r och d för när pixlarna åkt utanför skärmen och sedan läggs till på särmen med nya värden
			x: Math.random()*Wc,
			y: Math.random()*Hc,
			r: Math.random()*7+1,
			d: Math.random()*mp
		})
	}

  //Detta är funktionen till hur partiklaran kommer och se ut på hemsidan
	function draw()
	{
    //Slätar ut skärmytan
		ctx.clearRect(0, 0, Wc, Hc);

    //färgen för partiklarna
		ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    //tar bort partikelns tidigare possition
    ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
      //detta är vad som gör at det inte blir en trail bakom partikeln
			ctx.moveTo(p.x, p.y);
      //fixar utseandet på partikeln så att det blir en cirkel
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
    //Detta är vad som ger färgen från ctx.fillstyle
		ctx.fill();
		update();
	}

  //Detta är vad som ger orginal lutningen för flingorna
	var angle = 0;
  //Detta är vad som gör att partiklarna rör på sig i sidan
	function update()
	{
    //detta är vad som gör att cos och sin man ge partiklarna en lutning
		angle += 0.01;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
      //detta är vad som kommer och ändra på partiklarnas lutning
			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
			p.x += Math.sin(angle) * 2;

      //Detta är vad som gör att partiklarna alltid är på skärmen
			if(p.x > Wc+5 || p.x < -5 || p.y > Hc)
			{
        //kollar om partiklarna åker utanför den nedersta delen av skärmen och sätter tillbaka de lite ovanför toppen på skärmen
				if(i%3 > 0)
				{
					particles[i] = {x: Math.random()*Wc, y: -10, r: p.r, d: p.d};
				}
				else
				{
          //här kollar den ifall partiklarna åker ut på den horizontala axen och sätter particeln på den motsatta sidan
					if(Math.sin(angle) > 0)
					{
						particles[i] = {x: -5, y: Math.random()*Hc, r: p.r, d: p.d};
					}
					else
					{
						particles[i] = {x: Wc+5, y: Math.random()*Hc, r: p.r, d: p.d};
					}
				}
			}
		}
	}
  //detta är vad som sätter animation loop (hur snabbt den loopar) då ett lägre värde gör det snabbare
	setInterval(draw, 30);
}



//detta sätter datumet för när timerns är 0
var countDownDate = new Date("Dec 24, 2018 0:0:0").getTime();


var x = setInterval(function() {
  //kollar datumet från användaren
  var now = new Date().getTime();

  //sätter hur lång tid det är kvar tills det valda datumet
  var distance = countDownDate - now;

  //alla sorters nedräkningar för att få ut hur lång tid det är kvar till det valda datumet
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //skrivet ut variablerna i valda id's som finns i html koden
  document.getElementById("days").innerHTML = days + " days";
  document.getElementById("hours").innerHTML = hours + " Hours";
  document.getElementById("min").innerHTML = minutes + " Min";
  document.getElementById("sec").innerHTML = seconds + " Sec";

  //kollar om nedräkningen är på 0 (rätt dag, timmar, min och sek) så kommer den skriva ut en text i vald html id
  if (distance < 0) {
      clearInterval(x);
      document.getElementById("days").innerHTML = "Merry Xmas";
  }
//den uppdaterar klockan varje sek och på det sättet kan man använda sekunder i klockan
}, 1000);
