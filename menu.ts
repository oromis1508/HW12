abstract class Menu<T> {
    clickItem(item: T) {
        
    }
}

enum MainPageMenuItem {}

class MainPageMenu extends Menu<MainPageMenuItem> {

}

new MainPageMenu().clickItem()