export type MixPanelTrack =
  | {
      eventName: 'Clicked Wine Quiz CTA'
      properties: {
        Content: 'navbar' | 'hero' | 'footer'
      }
    }
  | {
      eventName: 'Provided email from Create Acc'
      properties: {
        distinct_id: string
      }
    }
  | {
      eventName: 'Provided Wine Exp from Create Acc'
      properties: {
        distinct_id: string
        'Wine Experience': string
      }
    }
  | {
      eventName: 'Provided Often Drink Wine from Create Acc'
      properties: {
        distinct_id: string
        'Often Drink Wine': string
      }
    }
  | {
      eventName: 'Provided Favorite Type Wine from Create Acc'
      properties: {
        distinct_id: string
        'Favorite Type Wine': string[]
      }
    }
  | {
      eventName: 'Provided Sweet or Dry Wine from Create Acc'
      properties: {
        distinct_id: string
        'Sweet Or Dry Wine': string
      }
    }
  | {
      eventName: 'Provided Type Food from Create Acc'
      properties: {
        distinct_id: string
        'Type Of Food Enjoy': string[]
      }
    }
  | {
      eventName: 'Provided Password from Create Acc'
      properties: {
        distinct_id: string
        'Full Name': string
      }
    }
