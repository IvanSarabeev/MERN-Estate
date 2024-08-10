declare module '*.png' {
    const content: string;
    export default content;
  }
  
  declare module '*.jpg' {
    const content: string;
    export default content;
  }
  
  declare module '*.jpeg' {
    const content: string;
    export default content;
  }
  
  declare module '*.svg' {
    const content: string;
    export default content;
  }

  declare module 'lodash/clone' {
    import clone from 'lodash';
    export default clone;
  }
  
  declare module 'lodash/orderBy' {
    import orderBy from 'lodash';
    export default orderBy;
  }
  
  