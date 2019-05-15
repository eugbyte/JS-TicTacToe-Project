
function generate_table() {
    var table = document.createElement('table');
    table.className = 'table table-bordered';

    counter = 0;
    for (let i = 0; i < 3; i++){
        var row = table.insertRow(i);
        for (let j = 0; j < 3; j++){
            var td = row.insertCell(j);
            td.id = counter.toString();
            //td.textContent = counter;
            counter += 1;
        }
    }
    document.body.appendChild(table);
}

generate_table();

var tag_list = document.getElementsByTagName('td');
tag_list = Array.from(tag_list);
console.log(tag_list);

var player_turn = true;
function player_input(){
    for (let i = 0; i <tag_list.length ; i++){
        function change_to_X(){
            if (tag_list[i].textContent == ''){
                tag_list[i].textContent = 'X';
                player_turn = false;
                //console.log(player_turn);
            }
        }
        tag_list[i].addEventListener('click', change_to_X);
    }
}

player_input();

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  } 

function computer_input(){
    console.log('computer_input() running');
    if (player_turn == false){
        random_id = getRndInteger(0, 9);
        while (tag_list[random_id].textContent == 'X' || tag_list[random_id].textContent== 'O'){
            if (draw_condition()) {
                return
            } else {
            random_id = getRndInteger(0, 9);
            }
        }
        console.log(random_id);
        tag_list[random_id].textContent = 'O';
        player_turn = true;
    }
}

function win_condition(){
    //row wins
    for (let i = 0; i < 9; i += 3){
        check_string = tag_list[i].textContent + tag_list[i+1].textContent + tag_list[i+2].textContent;
        if (check_string == 'XXX' || check_string == 'OOO'){
            return true;
        }
    }

    //column wins 
    for (let i = 0; i < 3; i ++){
        check_string = tag_list[i].textContent + tag_list[i+3].textContent + tag_list[i+6].textContent;
        if (check_string == "XXX" || check_string ==  "OOO"){
            return true;
        }
    }

    //diagonal wins
    diagonal_1 = tag_list[0].textContent + tag_list[4].textContent + tag_list[8].textContent;
    diagonal_2 = tag_list[2].textContent + tag_list[4].textContent + tag_list[6].textContent;
    if (diagonal_1 == 'XXX' || diagonal_1 ==  'OOO'){
        return true;
    }
    if (diagonal_2 == 'XXX' || diagonal_2 ==  'OOO'){
        return true;
    }   

    return false;
}

function draw_condition(){
    var counter = 0;
    for (let i =0; i < tag_list.length; i++){
        if (tag_list[i].textContent == 'X' || tag_list[i].textContent == 'O'){
            counter += 1;
        }
    }
    console.log(counter);
    if (counter == tag_list.length) {
        return true;
    } else {
        return false;
    }
}


// while (! win_condition()){
//     computer_input();
//     console.log(player_turn);
// }

function end_of_player_turn(){
    computer_input();
    if (win_condition()){
        window.alert('one of the players have won');
    } else if (draw_condition()) {
        window.alert('game is a draw');
    }
}

function delayed_end_of_player_turn(){
    setTimeout(end_of_player_turn, 500);
}


for (let i = 0; i <tag_list.length ; i++){
    tag_list[i].addEventListener('click', delayed_end_of_player_turn);
}

// button = document.createElement('button');
// button.className = 'btn btn-primary';
// button.textContent = 'end turn';
// button.addEventListener('click', end_of_player_turn);
// document.body.appendChild(button);
