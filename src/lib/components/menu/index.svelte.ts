class Menu{
    menuCard : HTMLElement = $bindable();
    toggle: HTMLButtonElement = $bindable();
    active_state = $state<boolean>(false);

    constructor(card: HTMLElement, toggle: HTMLButtonElement){
        this.menuCard = card;
        this.toggle = toggle;
    }

    stateToggler(){
        this.active_state = !this.active_state;
    }
}


