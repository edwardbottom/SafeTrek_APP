//variables for different screens
let login_screen = document.getElementById('login_screen');
let register_screen = document.getElementById('register_screen');
let parent_home_screen = document.getElementById('parent_home_screen');
let police_screen = document.getElementById('police_screen');
let medical_screen = document.getElementById('medical_screen');
let services_contacted_screen = document.getElementById('services_contacted_screen');
let change_child_screen = document.getElementById('change_child_screen');
let add_child_screen = document.getElementById('add_child_screen');
let child_home_screen = document.getElementById('child_home_screen');

//variables for buttons
let login_button = document.getElementById('login_button');
let go_to_register_button = document.getElementById('go_to_register');
let register_user_button = document.getElementById('register_button');
let panic_button = document.getElementById('panic_button');
let medical_button = document.getElementById('medical_button');
let call_police_button = document.getElementById('call_police');
let cancel_police_call_button = document.getElementById('cancel_police_call');
let call_medical_button = document.getElementById('call_medical');
let cancel_medical_call_button = document.getElementById('cancel_medical_call');
let cancel_register_button = document.getElementById('cancel_register');
let logout_button = document.getElementById('logout_button');
let return_to_home_button = document.getElementById("return_to_home");
let change_child_button = document.getElementById("change_child");
let add_child_button = document.getElementById("add_child");
let submit_new_child_button = document.getElementById("submit_child");
let cancel_submit_child_button = document.getElementById("cancel_submit_child_button");
let cancel_change_child_button = document.getElementById("cancel_change_child_button");

//sets the intial screen settings
function intialSetup(){
	login_screen.hidden = false;
	register_screen.hidden = true;
	parent_home_screen.hidden = true;
	police_screen.hidden = true;
	medical_screen.hidden = true;
	services_contacted_screen.hidden = true;
	change_child_screen.hidden = true;
	add_child_screen.hidden = true;
	child_home_screen.hidden = true;
}

window.onload = intialSetup();


login_button.addEventListener("click", function(){
	login_screen.hidden = true;
	parent_home_screen.hidden = false;
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
	parent_home_screen.hidden = true;
	login_screen.hidden = false;
});

panic_button.addEventListener("click", function(){
	parent_home_screen.hidden = true;
	police_screen.hidden = false; 
});

call_police_button.addEventListener("click", function(){
	police_screen.hidden = true;
	services_contacted_screen.hidden = false;
});

cancel_police_call_button.addEventListener("click", function(){
	police_screen.hidden = true;
	parent_home_screen.hidden = false;
})

medical_button.addEventListener("click", function(){
	medical_screen.hidden = false;
	parent_home_screen.hidden = true;
});

cancel_medical_call.addEventListener("click", function(){
	medical_screen.hidden = true;
	parent_home_screen.hidden = false;
});

call_medical_button.addEventListener("click", function(){
	medical_screen.hidden = true;
	services_contacted_screen.hidden = false;
});

return_to_home_button.addEventListener("click", function(){
	services_contacted_screen.hidden = true;
	parent_home_screen.hidden = false;
});

change_child_button.addEventListener("click", function(){
	parent_home_screen.hidden = true;
	change_child_screen.hidden = false;
});

add_child_button.addEventListener("click", function(){
	parent_home_screen.hidden = true;
	add_child_screen.hidden = false;
});

submit_new_child_button.addEventListener("click", function(){
	parent_home_screen.hidden = false;
	add_child_screen.hidden = true;
});

cancel_submit_child_button.addEventListener("click", function(){
	parent_home_screen.hidden = false;
	add_child_screen.hidden = true;
});

cancel_change_child_button.addEventListener("click", function(){
	change_child_screen.hidden = true;
	parent_home_screen.hidden = false;
})





