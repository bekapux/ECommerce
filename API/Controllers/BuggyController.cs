using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {            
            return BadRequest(new ProblemDetails { Title = "This is a bad request" });
        }

        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorized()
        {            
            return Unauthorized();
        }

        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1", "This is the first error");
            ModelState.AddModelError("Problem21", "This is the second error");
            return ValidationProblem();
        }
        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("Internal server error");
        }
    }
}
