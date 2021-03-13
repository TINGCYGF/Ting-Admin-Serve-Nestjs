import { StrategyOptions, Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Admin } from "@libs/db/models/admin/admin.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


//jwt策略类
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
  constructor(@InjectRepository(Admin)
              private readonly adminRepository: Repository<Admin>,) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "process.env.SECRET"
    } as StrategyOptions);
  }

  //自动调用传给他
  async validate(id){
    return await this.adminRepository.find({username:id})
  }
}