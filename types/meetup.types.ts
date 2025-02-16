export interface IMeetupData {
  title: string,
  image: string,
  address: string,
  description: string,
}

export interface IMeetupItem extends IMeetupData {
  id: string
} 