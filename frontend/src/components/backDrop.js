function BackDrop({show,closeSideDrawer}){
    return(
        show && <div className="md:hidden h-full w-full bg-gray-900/50 fixed z-50 top-0 left-0" onClick={closeSideDrawer}>
        </div>
    );
}

export default BackDrop;