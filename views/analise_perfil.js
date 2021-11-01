function validateForm() {
   if(!validaElemento('rdElementoPrimario')){
        alert('Elemento primário não informado.');
        return false;
    }

    if(!validaElemento('rdElementoSecundario')){
        alert('Elemento secundário não informado.');
        return false;
    }

    if(!validaIdade()){
        return false;
    }
    
    if(!validaOpcoes()){
        return false;
    }
    
    document.questionario.submit();
}

function validaOpcoes(){
    var radios;
    var isChecked = false;

    for (var j = 1, lengthQuest = 25; j <= lengthQuest; j++) {
       
        radios = document.getElementsByName('r' + j + '_1');
        
        isChecked = false; 
        for (var i = 0, length = radios.length; i < length; i++) {
            
            if (radios[i].checked) {      
               
                isChecked = true;
                break;
            }
        }

        if(!isChecked){
            var opcao = j;
            alert('Opção ' + opcao + ' não informada.');
            return false;
        }
    }
    return true;
}

function validaIdade(){
    if(document.questionario.idade.value == ''){
        alert('Informe a sua idade.');
        return false;
    }
    if(document.questionario.idade.value < 0 || document.questionario.idade.value > 120){
        alert('Idade inválida.');
        return false;
    }
    return true;
}

function validaElemento(elementos) {
    var isChecked = false;
    var elemento; 

    elemento = document.getElementsByName(elementos);

    isChecked = false; 
    for (var i = 0; i < elemento.length; i++) {
        
        if (elemento[i].checked) {    
            isChecked = true;
            break;
        }
    }

    if(!isChecked){
        var opcao = i;           
        return false;
        }
    
    return true;
}
