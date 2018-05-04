//variables for different screens
let login_screen = document.getElementById('login_screen');
let register_screen = document.getElementById('register_screen');
let home_screen = document.getElementById('home_screen');
let police_screen = document.getElementById('police_screen');
let medical_screen = document.getElementById('medical_screen');
let services_contacted_screen = document.getElementById('services_contacted_screen');
let warning_screen = document.getElementById('warning_timer');

//variables for buttons
let login_button = document.getElementById('login_button');
let go_to_register_button = document.getElementById('go_to_register');
let register_user_button = document.getElementById('register_button');
let panic_button = document.getElementById('panic_button');
let medical_button = document.getElementById('medical_button');
let toggle_safety_button = document.getElementById('toggle_safety');
let toggle_run_button = document.getElementById('toggle_run');
let call_police_button = document.getElementById('call_police');
let cancel_police_call_button = document.getElementById('cancel_police_call');
let call_medical_button = document.getElementById('call_medical');
let cancel_medical_call_button = document.getElementById('cancel_medical_call');
let cancel_timer_button = document.getElementById('cancel_timer');
let cancel_register_button = document.getElementById('cancel_register');
let logout_button = document.getElementById('logout_button');
let return_to_home_button = document.getElementById("return_to_home");

//sets the intial screen settings
function intialSetup(){
	login_screen.hidden = false;
	register_screen.hidden = true;
	home_screen.hidden = true;
	police_screen.hidden = true;
	medical_screen.hidden = true;
	services_contacted_screen.hidden = true;
	warning_screen.hidden = true;
}

window.onload = intialSetup();


login_button.addEventListener("click", function(){
	login_screen.hidden = true;
	home_screen.hidden = false;
});

go_to_register_button.addEventListener("click", function(){
	login_screen.hidden = true;
	register_screen.hidden = false;
});

cancel_register_button.addEventListener("click", function(){
	login_screen.hidden = false;
	register_screen.hidden = true;
});

register_button.addEventListener("click", function(){
	login_screen.hidden = false;
	register_screen.hidden = true;
});

logout_button.addEventListener("click", function(){
	home_screen.hidden = true;
	login_screen.hidden = false;
});

panic_button.addEventListener("click", function(){
	home_screen.hidden = true;
	police_screen.hidden = false; 
});

call_police_button.addEventListener("click", function(){
	police_screen.hidden = true;
	services_contacted_screen.hidden = false;
});

cancel_police_call_button.addEventListener("click", function(){
	police_screen.hidden = true;
	home_screen.hidden = false;
})

medical_button.addEventListener("click", function(){
	medical_screen.hidden = false;
	home_screen.hidden = true;
});

cancel_medical_call.addEventListener("click", function(){
	medical_screen.hidden = true;
	home_screen.hidden = false;
});

call_medical_button.addEventListener("click", function(){
	medical_screen.hidden = true;
	services_contacted_screen.hidden = false;
});

return_to_home_button.addEventListener("click", function(){
	services_contacted_screen.hidden = true;
	home_screen.hidden = false;
})




