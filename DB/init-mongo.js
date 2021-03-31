db.createUser({
  user: 'Epitest',
  pwd: 'Erwaf',
  roles: [
    {
      role: 'readWrite',
      db: 'Drugs'
    }
  ]
})
