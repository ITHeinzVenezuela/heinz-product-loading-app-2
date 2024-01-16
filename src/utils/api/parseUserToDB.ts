const parseUserToDB = (body: User) => {
  const { id, is_admin, password_login_available, ...rest } = body
  const user = {
    ...rest,
    is_admin: is_admin ? 1 : 0,
    password_login_available: password_login_available ? 1 : 0,
  }
  return user;
}

export default parseUserToDB;