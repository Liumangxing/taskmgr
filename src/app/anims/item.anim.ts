import { trigger, state, style, animate, transition } from "@angular/animations";

export const itemAnim = trigger('item', [
    state('out', style({ 'border-left-width': '3px' })),
    state('in', style({ 'border-left-width': '8px' })),
    transition('out=>in', animate('100ms ease-in')),
    transition('in=>out', animate('100ms ease-out'))
]);