# Sequelize Hooks, Validations & Helper

## [Sequelize Hooks](https://sequelize.org/docs/v6/other-topics/hooks/)
Apa itu Sequelize Hooks? Sequelize Hooks adalah fitur yang memungkinkan kita untuk menjalankan fungsi tertentu pada saat event tertentu terjadi pada model, seperti sebelum atau sesudah data disimpan, dihapus, atau diperbarui. Ini sangat berguna untuk melakukan manipulasi data sebelum atau setelah operasi database.

Terdapat beberapa jenis hooks yang tersedia dan akan dijalankan sesuai urutan :
```
(1)
  beforeBulkCreate(instances, options)
  beforeBulkDestroy(options)
  beforeBulkUpdate(options)
(2)
  beforeValidate(instance, options)

[... validation happens ...]

(3)
  afterValidate(instance, options)
  validationFailed(instance, options, error)
(4)
  beforeCreate(instance, options)
  beforeDestroy(instance, options)
  beforeUpdate(instance, options)
  beforeSave(instance, options)
  beforeUpsert(values, options)

[... creation/update/destruction happens ...]

(5)
  afterCreate(instance, options)
  afterDestroy(instance, options)
  afterUpdate(instance, options)
  afterSave(instance, options)
  afterUpsert(created, options)
(6)
  afterBulkCreate(instances, options)
  afterBulkDestroy(options)
  afterBulkUpdate(options)
```

### Declaring hooks
Terdapat 3 cara untuk mendeclare hooks : 
1. Method 1 via the `hooks` property in the model definition
```js
class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    mood: {
      type: DataTypes.ENUM,
      values: ['happy', 'sad', 'neutral'],
    },
  },
  {
    hooks: {
      beforeValidate: (user, options) => {
        user.mood = 'happy';
      },
      afterValidate: (user, options) => {
        user.username = 'Toni';
      },
    },
    sequelize,
  },
);
```

2. Method 2 via the .addHook() method
```js
User.addHook('beforeValidate', (user, options) => {
  user.mood = 'happy';
});
```

3. Method 3 via the direct method
```js
User.beforeCreate(async (user, options) => {
  const hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;
});
```
## [Sequelize Validations & Constraints](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/)
Sequelize menyediakan 2 cara untuk menambahkan aturan pada aplikasi dengan menggunakan `Validation` & `Constraints`. Apa perbedaannya?
- [Validations](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#per-attribute-validations): Validasi dilakukan pada level aplikasi sebelum data dikirim ke database. Jika validasi gagal, Sequelize akan melemparkan error dan tidak akan menyimpan data ke database. Kita bisa menambahkan properti `validate` pada kolom model untuk menambahkan validasi.
- [Constraints](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#unique-constraint): Constraints adalah aturan yang diterapkan pada level database. Jika data yang dimasukkan tidak memenuhi constraints, database akan menolak operasi tersebut. Constraints perlu ditambahkan pada `migrations` dan juga `model`. Contoh constraints yang umum digunakan adalah `unique`, `allowNull`,  dan `defaultValue`.

## Helper Functions
Apa itu helper functions? Sebenarnya helper function bukan fitur yang disediakan oleh sequelize, melainkan hanyalah metode yang bisa digunakan untuk memisahkan kode yang digunakan berulang kali sehingga tidak redundant. Layaknya seperti `EJS Partials`. Kita bisa membuat folder `helpers` dan membuat function sesuai kebutuhan aplikasi. Contoh, kita bisa membuat function helper untuk `format date` yang digunakan di banyak tempat.


