
export class MultiMap<T> {
    private map: Map<string, T[]> = new Map();
  
    add(key: string, value: T) {
      if (!this.map.has(key)) {
        this.map.set(key, []);
      }
      this.map.get(key)!.push(value);
    }
  
    get(key: string): T[] {
      return this.map.get(key) || [];
    }
  
    has(key: string): boolean {
      return this.map.has(key);
    }
  
    forEach(callback: (key: string, values: T[]) => void) {
      for (const [key, values] of this.map.entries()) {
          callback(key, values);
      }
    }

    delete(key: string, value: T): boolean {
      if (this.map.has(key)) {
        const values = this.map.get(key)!;
        const index = values.indexOf(value);
        if (index !== -1) {
          values.splice(index, 1);
          if (values.length === 0) {
            this.map.delete(key);
          }
          return true;
        }
      }
      return false;
    }

    deleteKey(key: string): boolean {
      if (this.map.has(key)) {
        this.map.delete(key);
        return true;
      }
      return false;
    }

    clear() {
      this.map.clear();
    }
  
    keys(): string[] {
      return Array.from(this.map.keys());
    }
}
