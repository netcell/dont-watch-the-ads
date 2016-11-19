export default function screen(state = 'menu', action) {
  switch (action.type) {
    case 'GO_TO_STORY': return 'story';
    case 'GO_TO_GAME': return 'game';
    case 'GO_TO_MENU': return 'menu';
    default: return state;
  }
}