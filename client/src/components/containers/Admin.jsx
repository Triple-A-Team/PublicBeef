const User = (props) => (
  <div className='ui top attached tabular menu'>
    {
      props.tabs.map((tab, index) => (
        <div
          key={index} className={tab.active ? 'active item' : 'item'} onClick={() => props.onClick(tab.id)}>
          {tab.title}
        </div>
      ))
    }
  </div>
);