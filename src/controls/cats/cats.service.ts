import { Injectable } from '@nestjs/common';
export interface Cat {
  name: string;
  age: number;
  breed: string;
}

@Injectable()
export class CatsService {
  private cats: Cat[] = [];
  findAll(): Cat[] {
    return this.cats;
  }
  create(cat: Cat) {
    this.cats.push(cat);
  }
}
